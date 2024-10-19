// app/api/chat-events/route.ts

import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { EventEmitter } from 'events'

// Create a global event emitter
const eventEmitter = new EventEmitter()

// Set up Prisma event listener
// @ts-ignore
prisma.$on('create', (event: Prisma.MiddlewareParams) => {
  if (event.model === 'ChatMessage') {
    eventEmitter.emit('newMessage', event.args.data)
  }
})

export async function GET(request: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Send a ping every 30 seconds to keep the connection alive
      const pingInterval = setInterval(() => {
        sendEvent({ type: 'ping' })
      }, 30000)

      // Listen for new messages and send them to the client
      const messageListener = (data: any) => {
        sendEvent({ type: 'message', data })
      }

      eventEmitter.on('newMessage', messageListener)

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(pingInterval)
        eventEmitter.off('newMessage', messageListener)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
