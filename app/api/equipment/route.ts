import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuth() {
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET() {
  const items = await prisma.equipment.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  const item = await prisma.equipment.create({ data });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  if (!(await isAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  await prisma.equipment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
