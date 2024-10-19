import React from 'react'
import { DyteMeeting } from '@dytesdk/react-ui-kit'
import { useDyteMeeting } from '@dytesdk/react-web-core'

const MyMeeting = () => {
  const { meeting } = useDyteMeeting()

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DyteMeeting mode='fill' meeting={meeting} />
    </div>
  )
}

export default MyMeeting
