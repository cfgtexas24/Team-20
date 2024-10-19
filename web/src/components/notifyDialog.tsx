import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { env } from '@/env.mjs'

const CallDialog = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCall = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toPhoneNumber: env.NEXT_PUBLIC_PHONE_NUMBER,
          fromPhoneNumber: 'YOUR_PHONE_NUMBER', // replace with actual phone number
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send SMS')
      }

      // If SMS sent successfully, initiate the call
      window.location.href = `tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`
      setIsOpen(false)
    } catch (error) {
      console.error('Error during call or SMS:', error)
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className='w-full bg-[#2d69fa] hover:bg-[#2d69fa]/90 text-white font-bold'
        >
          <span className='flex-grow text-left'>Call Now</span>
          <div className='px-2 py-1 bg-[#e9edfe] rounded-lg border border-[#ccd2e8] flex items-center gap-1 ml-2'>
            <span className='text-[#6d748a] text-xs font-normal'>⌘</span>
            <span className='text-[#393f55] text-xs font-normal'>C</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Call</DialogTitle>
          <DialogDescription>Are you sure you want to call?</DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className='mt-4 flex justify-end space-x-2'>
          <Button variant='outline' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCall} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Call Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CallDialog
