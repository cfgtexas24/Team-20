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
      <DialogTrigger className='w-full'>
        <div className='py-2 justify-center items-center flex w-full'>
          <Button className='text-white font-bold leading-tight bg-[#2d69fa] '>
            Notify Immediately
            <div className='px-2 py-1 bg-[#e9edfe] rounded-lg border border-[#ccd2e8] justify-center items-center gap-1 flex'>
              <div className="text-[#6d748a] text-xs font-normal font-['Inter'] leading-none">
                ⌘
              </div>
              <div className="text-[#393f55] text-xs font-normal font-['Inter'] leading-none">
                N
              </div>
            </div>
          </Button>
        </div>
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
