import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated() {
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function GET() {
  const schedule = await prisma.classSchedule.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(schedule);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { day, time, className, trainer, order } = await request.json();
  const item = await prisma.classSchedule.create({
    data: { day, time, className, trainer, order: order || 0 },
  });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await request.json();
  await prisma.classSchedule.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
