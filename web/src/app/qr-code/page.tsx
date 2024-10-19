'use client'

import QrCode from '@/components/qr-code'
import React from 'react'

const MyPass = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>My Event Pass</h1>
      <QrCode />
    </div>
  )
}

export default MyPass
