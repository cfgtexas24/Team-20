'use client'

import React, { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useUser } from '@clerk/nextjs'

const QrCode: React.FC = () => {
  const [qrValue, setQrValue] = useState('')
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      generateQrValue(user.id)
    }
  }, [isLoaded, isSignedIn, user])

  const generateQrValue = (userId: string) => {
    const timestamp = Date.now()
    const qrData = {
      userId,
      timestamp,
    }
    setQrValue(JSON.stringify(qrData))
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className='max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg my-4'>
      <div className='p-4 bg-gradient-to-r from-blue-500 to-purple-600'>
        <h2 className='text-xl font-bold text-white text-center'>
          My Check-In Pass
        </h2>
      </div>
      <div className='p-4'>
        <div className='flex justify-center mb-4'>
          <QRCodeSVG value={qrValue} size={200} />
        </div>
        <p className='text-center text-sm text-gray-600'>
          Scan this QR code to check in
        </p>
        <p className='text-center text-xs text-gray-500 mt-2'>
          Valid for all STORM events
        </p>
      </div>
    </div>
  )
}

export default QrCode
