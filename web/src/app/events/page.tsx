'use client'

import { useState } from 'react'

const EventCard = ({ event, onRSVP }: any) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
      <h2 className='text-xl font-bold mb-2'>{event.name}</h2>
      <p className='text-gray-600 mb-2'>{event.dateTime}</p>
      <p className='text-gray-600 mb-4'>{event.location}</p>
      <button
        onClick={() => onRSVP(event.id)}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
      >
        RSVP
      </button>
    </div>
  )
}

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Campus Tour',
      dateTime: '2024-10-20 10:00 AM',
      location: 'Main Campus',
      rsvped: false,
    },
    {
      id: 2,
      name: 'Career Fair',
      dateTime: '2024-10-25 1:00 PM',
      location: 'Student Center',
      rsvped: false,
    },
    {
      id: 3,
      name: 'Alumni Meetup',
      dateTime: '2024-11-05 6:00 PM',
      location: 'Downtown Conference Center',
      rsvped: false,
    },
  ])

  const handleRSVP = (eventId: any) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, rsvped: !event.rsvped } : event
      )
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Events</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onRSVP={handleRSVP} />
        ))}
      </div>
    </div>
  )
}

export default Events
