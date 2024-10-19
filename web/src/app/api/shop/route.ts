import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Define the expected request body type
interface SpriteUpdateRequestBody {
  userId: number;
  clothingId: number;
}

export async function POST(req: Request) {
  const body: SpriteUpdateRequestBody = await req.json();
  const { userId, clothingId } = body;

  try {
    await prisma.avatar.update({
      where: { userId },
      data: {
        clothes: {
          connect: { id: clothingId },
        },
      },
    });

    return NextResponse.json({ message: 'Avatar updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating avatar' }, { status: 500 });
  }
}
