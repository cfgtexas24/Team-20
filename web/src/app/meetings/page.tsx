import React from 'react'
import Link from 'next/link';

const LiveCall = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white rounded-lg shadow-md p-8 max-w-md w-full'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          Welcome to Storms Mentor Live Video!
        </h1>
        <p className='text-gray-600 mb-6'>
          Connect with your mentor in real-time through our live video platform.
        </p>
        <Link
          href='/meetings/live'
          className='block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center transition duration-300'
        >
          Join Mentor Meeting
        </Link>
      </div>
    </div>
  );
}


export default LiveCall