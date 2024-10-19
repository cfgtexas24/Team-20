// app/api/send-sms/route.ts
import { NextResponse } from 'next/server'
import twilio from 'twilio'

import { env } from '@/env.mjs'

const accountSid = env.TWILIO_ACCOUNT_SID
const authToken = env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export async function POST(request: Request) {
  try {
    const { toPhoneNumber, fromPhoneNumber } = await request.json()

    await client.messages.create({
      body: `You are receiving a call from ${fromPhoneNumber}`,
      from: env.TWILIO_PHONE_NUMBER,
      to: toPhoneNumber,
    })

    return NextResponse.json({ message: 'SMS sent successfully' })
  } catch (error) {
    console.error('Error sending SMS:', error)
    return NextResponse.json(
      { message: 'Failed to send SMS', error },
      { status: 500 }
    )
  }
}
