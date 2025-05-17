import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ history: [] });
  const history = await prisma.workflowResult.findMany({
    where: { userId },
    select: {
      id: true,
      item_name: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ history });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await prisma.workflowResult.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 