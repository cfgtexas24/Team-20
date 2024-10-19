import React from 'react'
import Link from 'next/link';

const LiveCall = () => {
  return (
    <div className='min-h-screen p-8'>
      <h1>Welcome to Storms Mentor Live Video!</h1>
      <Link href='/livecall/live' className='text-blue-500 underline'>
        Join Mentor Meeting
      </Link>
    </div>
  );
}

export default LiveCall
