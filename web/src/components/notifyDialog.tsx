import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

const CallDialog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCall = async () => {
    setIsLoading(true);
    try {
      // Send SMS notification before making the call
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toPhoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER,
          fromPhoneNumber: 'YOUR_PHONE_NUMBER', // replace with actual phone number
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }

      // Initiate the phone call
      window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
    } catch (error) {
      console.error('Error during call or SMS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full bg-[#2d69fa] hover:bg-[#2d69fa]/90 text-white font-bold"
        >
          <span className="flex-grow text-left">Call Now</span>
          <div className="px-2 py-1 bg-[#e9edfe] rounded-lg border border-[#ccd2e8] flex items-center gap-1 ml-2">
            <span className="text-[#6d748a] text-xs font-normal">⌘</span>
            <span className="text-[#393f55] text-xs font-normal">C</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Call</DialogTitle>
          <DialogDescription>
            Are you sure you want to call?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline">
            Cancel
          </Button>
          <Button onClick={handleCall} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Call Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
