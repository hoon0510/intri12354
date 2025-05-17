import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, credits } = await request.json();
  if (!userId || typeof credits !== 'number') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { credits }
  });
  return NextResponse.json({ success: true });
} 