'use client'

import EventsPage from '@/components/events'
import Chatbot from '@/components/Chatbot'

const MyPage = () => {
  return (
    <>
      <div className='w-full'>
        <EventsPage />
        <Chatbot />
      </div>
    </>
  )
}

export default MyPage;
