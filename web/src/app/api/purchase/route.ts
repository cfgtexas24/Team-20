import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req) {
  const body = await req.json();
  const { userId, clothingId } = body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const clothing = await prisma.clothing.findUnique({ where: { id: clothingId } });

    // Check if user has enough points
    if (user.points >= clothing.price) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: user.points - clothing.price,
          avatar: {
            update: {
              clothes: {
                connect: { id: clothingId },
              },
            },
          },
        },
      });

      return NextResponse.json({ message: 'Purchase successful' });
    } else {
      return NextResponse.json({ message: 'Not enough points' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error processing purchase' }, { status: 500 });
  }
}
