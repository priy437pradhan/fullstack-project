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
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  if (!(await isAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: data,
    create: { id: 'singleton', ...data },
  });
  return NextResponse.json(settings);
}
