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
  const plans = await prisma.membershipPlan.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(plans);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name, duration, price, features, order } = await request.json();
  const plan = await prisma.membershipPlan.create({
    data: { name, duration, price, features, order: order || 0 },
  });
  return NextResponse.json(plan);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await request.json();
  await prisma.membershipPlan.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
