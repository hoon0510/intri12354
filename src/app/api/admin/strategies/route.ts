import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const strategies = await prisma.workflowResult.findMany({
    select: {
      id: true,
      item_name: true,
      createdAt: true,
      user: {
        select: {
          email: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // 사용자 이메일 정보를 포함하여 반환
  const formattedStrategies = strategies.map(strategy => ({
    id: strategy.id,
    itemName: strategy.item_name,
    createdAt: strategy.createdAt,
    userEmail: strategy.user?.email || '(알 수 없음)'
  }));

  return NextResponse.json({ strategies: formattedStrategies });
} 