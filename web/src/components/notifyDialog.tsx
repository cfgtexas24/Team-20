import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'

const NotifyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className='w-full bg-[#2d69fa] hover:bg-[#2d69fa]/90 text-white font-bold'
        >
          <span className='flex-grow text-left'>Notify Immediately</span>
          <div className='px-2 py-1 bg-[#e9edfe] rounded-lg border border-[#ccd2e8] flex items-center gap-1 ml-2'>
            <span className='text-[#6d748a] text-xs font-normal'>⌘</span>
            <span className='text-[#393f55] text-xs font-normal'>N</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default NotifyDialog
