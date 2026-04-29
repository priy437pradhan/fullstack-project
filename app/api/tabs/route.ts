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
  const tabs = await prisma.tab.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(tabs);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { title, content, order } = await request.json();
  const tab = await prisma.tab.create({
    data: { title, content, order: order || 0 },
  });
  return NextResponse.json(tab);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await request.json();
  await prisma.tab.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
