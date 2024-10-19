'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import YoutubeVideos from './youtube-videos'
import {
  CalendarDays,
  MapPin,
  MessageSquare,
  Award,
  DollarSign,
} from 'lucide-react'

const NavigationButton = ({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <Link href={href} className='w-full'>
    <Button
      variant='outline'
      className='w-full mb-3 flex items-center justify-start space-x-2 py-6'
    >
      {icon}
      <span>{children}</span>
    </Button>
  </Link>
)

const EventCard = ({ event, onRSVP }: any) => (
  <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
    <h2 className='text-lg font-bold mb-2'>{event.name}</h2>
    <p className='text-gray-600 text-sm mb-2 flex items-center'>
      <CalendarDays className='w-4 h-4 mr-2' />
      {event.dateTime}
    </p>
    <p className='text-gray-600 text-sm mb-4 flex items-center'>
      <MapPin className='w-4 h-4 mr-2' />
      {event.location}
    </p>
    <Button
      onClick={() => onRSVP(event.id)}
      variant={event.rsvped ? 'secondary' : 'default'}
      className='w-full'
    >
      {event.rsvped ? 'Cancel RSVP' : 'RSVP'}
    </Button>
  </div>
)

const HomeDashboard = () => {
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

  const handleRSVP = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, rsvped: !event.rsvped } : event
      )
    )
  }

  return (
    <div className='container mx-auto px-4 py-6 sm:py-8'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left'>
        Welcome to Your Dashboard
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='sm:col-span-2 lg:col-span-1 order-2 sm:order-1'>
          <h2 className='text-xl font-bold mb-4'>Quick Links</h2>
          <div className='grid grid-cols-2 sm:grid-cols-1 gap-3'>
            <NavigationButton
              href='/resource-map'
              icon={<MapPin className='w-5 h-5' />}
            >
              Find Resources
            </NavigationButton>
            <NavigationButton
              href='/mentor-chat'
              icon={<MessageSquare className='w-5 h-5' />}
            >
              Talk with Mentor
            </NavigationButton>
            <NavigationButton
              href='/points'
              icon={<Award className='w-5 h-5' />}
            >
              Check Points
            </NavigationButton>
            <NavigationButton
              href='/cash-out'
              icon={<DollarSign className='w-5 h-5' />}
            >
              Cash Out
            </NavigationButton>
          </div>
        </div>

        <div className='sm:col-span-2 order-1 sm:order-2'>
          <h2 className='text-xl font-bold mb-4'>Upcoming Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {events.map((event) => (
              <EventCard key={event.id} event={event} onRSVP={handleRSVP} />
            ))}
          </div>
          <div className='mt-4 text-center sm:text-right'>
            <Link href='/events'>
              <Button variant='link'>View All Events</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <YoutubeVideos />
      </div>
    </div>
  )
}

export default HomeDashboard
