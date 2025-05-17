import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId } = await request.json();
  if (!userId) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // 실제로는 개인정보/전략 삭제, 이메일만 남기기 등 추가 로직 필요
  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json({ success: true });
} 