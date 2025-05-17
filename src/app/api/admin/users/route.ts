import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
      credits: true,
      // deletedAt: true // 실제로 필드가 있다면 포함
    },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ users });
} 