import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function getDateNDaysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function GET() {
  // 최근 7일 날짜 배열
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = getDateNDaysAgo(6 - i);
    return d.toISOString().slice(0, 10);
  });

  // 회원 가입 추이
  const userStats = await Promise.all(days.map(async date => {
    const count = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lt: new Date(date + 'T23:59:59.999Z'),
        }
      }
    });
    return { date, count };
  }));

  // 전략 생성 추이
  const strategyStats = await Promise.all(days.map(async date => {
    const count = await prisma.workflowResult.count({
      where: {
        createdAt: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lt: new Date(date + 'T23:59:59.999Z'),
        }
      }
    });
    return { date, count };
  }));

  // 총 회원수
  const totalUsers = await prisma.user.count();
  // 오늘 신규가입자수
  const today = new Date().toISOString().slice(0, 10);
  const newUsersToday = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(today + 'T00:00:00.000Z'),
        lt: new Date(today + 'T23:59:59.999Z'),
      }
    }
  });
  // 총 전략수
  const totalStrategies = await prisma.workflowResult.count();
  // 오늘 전략수
  const newStrategiesToday = await prisma.workflowResult.count({
    where: {
      createdAt: {
        gte: new Date(today + 'T00:00:00.000Z'),
        lt: new Date(today + 'T23:59:59.999Z'),
      }
    }
  });

  return NextResponse.json({
    userStats,
    strategyStats,
    totalUsers,
    newUsersToday,
    totalStrategies,
    newStrategiesToday
  });
} 