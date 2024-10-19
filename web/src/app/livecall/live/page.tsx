'use client'

import React, { useEffect } from 'react'
import { useDyteClient, DyteProvider } from '@dytesdk/react-web-core'
import MyMeeting from '../../../LiveVideoComponents/MyMeeting'

const LoadingFallback = () => (
  <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <div className='w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin'></div>
    <p className='mt-4 text-lg font-semibold text-gray-700'>
      Loading your meeting...
    </p>
  </div>
)

const LiveVideoPage = () => {
  const [meeting, initMeeting] = useDyteClient()

  useEffect(() => {
    const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN

    if (authToken) {
      initMeeting({
        authToken,
        defaults: {
          audio: false,
          video: false,
        },
      })
    }
  }, [initMeeting])

  return (
    <div className='live-video-container'>
      <DyteProvider value={meeting} fallback={<LoadingFallback />}>
        <MyMeeting />
      </DyteProvider>
    </div>
  )
}

export default LiveVideoPage
