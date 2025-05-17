import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { item_name, description, target, scenario, concern, market_type, competitors, additional_activities, country } = body;

    // 사용자 크레딧 확인
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.credits < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
    }

    // Claude API 호출
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `아이템/서비스명: ${item_name}
서비스 정의: ${description}
핵심 타겟: ${target}
사용 시나리오: ${scenario}
기획자의 전략 고민: ${concern}
시장 유형: ${market_type}
경쟁사/비교 대상: ${competitors}
추가 활동/보조 전략: ${additional_activities}
국가: ${country}`
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Claude API request failed');
    }

    const data = await response.json();
    const analysisText = data.content[0].text;

    // JSON 응답 파싱
    let analysisData;
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
    }

    // 결과 저장
    const result = await prisma.workflowResult.create({
      data: {
        item_name,
        finalResult: analysisText,
        analysis_data: analysisData,
        user: {
          connect: { email: session.user.email }
        }
      }
    });

    // 크레딧 차감
    await prisma.user.update({
      where: { email: session.user.email },
      data: { credits: { decrement: 1 } }
    });

    return NextResponse.json({
      id: result.id,
      response: analysisText,
      analysisData: analysisData,
      creditsUsed: 1,
      createdAt: result.createdAt
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 