'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

interface ChatMessage {
  id: string
  content: string
  createdAt: string
  userId: string
  userName: string
  userImage?: string
}

const CommunityChat: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchMessages()
      const eventSource = new EventSource('/api/chat-events')
      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'message') {
          setMessages((prevMessages) => [...prevMessages, message.data])
        }
      }
      return () => eventSource.close()
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/chat-messages')
      if (!response.ok) throw new Error('Failed to fetch messages')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast({
        title: 'Error',
        description: 'Failed to load chat messages. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const response = await fetch('/api/chat-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          userId: user?.id,
          userName: user?.fullName || user?.username || 'Anonymous',
          userImage: user?.imageUrl,
        }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setNewMessage('')
      // Fetch the latest messages after sending
      await fetchMessages()
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Please sign in to join the chat.</div>
  }

  return (
    <div className='flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg overflow-hidden' style={{background: 'white', border: '3px solid black'}}>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div key={message.id} className='flex items-start space-x-2'>
            <Avatar className='w-8 h-8'>
              <img
                src={message.userImage || '/default-avatar.png'}
                alt={message.userName}
              />
            </Avatar>
            <div>
              <h2 className='font-semibold' style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>{message.userName}</h2>
              <p className='text-sm'>{message.content}</p>
              <p className='text-xs text-gray-500'>
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className='p-4 bg-gray-100'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className='flex space-x-2'
        >
          <Input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            className='flex-1'
          />
          <Button type='submit'>Send</Button>
        </form>
      </div>
    </div>
  )
}

export default CommunityChat
