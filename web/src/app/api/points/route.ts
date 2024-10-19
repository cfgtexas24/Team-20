import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, amount } = await request.json()

    if (!action || !amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const user = await clerkClient.users.getUser(userId)
    let currentPoints = (user.publicMetadata.points as number) || 0

    if (action === 'add') {
      currentPoints += amount
    } else if (action === 'subtract') {
      currentPoints = Math.max(0, currentPoints - amount) // Prevent negative points
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        points: currentPoints,
      },
    })

    return NextResponse.json({ success: true, points: currentPoints })
  } catch (error) {
    console.error('Error updating points:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await clerkClient.users.getUser(userId)
    const points = (user.publicMetadata.points as number) || 0

    return NextResponse.json({ points })
  } catch (error) {
    console.error('Error fetching points:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
