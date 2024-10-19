import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId || '0') },
      include: {
        avatar: true,
        purchases: { include: { clothing: true } },
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
