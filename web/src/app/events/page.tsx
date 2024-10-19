'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Coffee,
} from 'lucide-react'

const EventCard = ({ event, onRSVP }: any) => (
  <div className='bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
    <h2 className='text-lg font-bold mb-2'>{event.name}</h2>
    <p className='text-gray-600 text-sm mb-2 flex items-center'>
      <CalendarDays className='w-4 h-4 mr-2' />
      {event.dateTime}
    </p>
    <p className='text-gray-600 text-sm mb-2 flex items-center'>
      <MapPin className='w-4 h-4 mr-2' />
      {event.location}
    </p>
    <p className='text-gray-600 text-sm mb-4 flex items-center'>
      <Users className='w-4 h-4 mr-2' />
      {event.attendees} attendees
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

const EventCategory = ({ title, icon, events, onRSVP }: any) => (
  <div className='mb-8'>
    <h2 className='text-2xl font-bold mb-4 flex items-center'>
      {icon}
      <span className='ml-2'>{title}</span>
    </h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {events.map((event: any) => (
        <EventCard key={event.id} event={event} onRSVP={onRSVP} />
      ))}
    </div>
  </div>
)

const Events = () => {
  const [events, setEvents] = useState([
    // Career Development Events
    {
      id: 1,
      name: 'Career Fair',
      dateTime: '2024-10-25 1:00 PM',
      location: 'Student Center',
      attendees: 500,
      rsvped: false,
      category: 'career',
    },
    {
      id: 2,
      name: 'Resume Workshop',
      dateTime: '2024-11-02 2:00 PM',
      location: 'Online',
      attendees: 100,
      rsvped: false,
      category: 'career',
    },
    {
      id: 3,
      name: 'Interview Skills Seminar',
      dateTime: '2024-11-10 10:00 AM',
      location: 'Career Center',
      attendees: 50,
      rsvped: false,
      category: 'career',
    },
    {
      id: 4,
      name: 'Networking Mixer',
      dateTime: '2024-11-15 6:00 PM',
      location: 'Downtown Conference Center',
      attendees: 200,
      rsvped: false,
      category: 'career',
    },

    // Educational Events
    {
      id: 5,
      name: 'Campus Tour',
      dateTime: '2024-10-20 10:00 AM',
      location: 'Main Campus',
      attendees: 30,
      rsvped: false,
      category: 'education',
    },
    {
      id: 6,
      name: 'Financial Aid Seminar',
      dateTime: '2024-11-05 3:00 PM',
      location: 'Admin Building',
      attendees: 75,
      rsvped: false,
      category: 'education',
    },
    {
      id: 7,
      name: 'Study Abroad Info Session',
      dateTime: '2024-11-12 1:00 PM',
      location: 'International Center',
      attendees: 60,
      rsvped: false,
      category: 'education',
    },
    {
      id: 8,
      name: 'Library Resources Workshop',
      dateTime: '2024-11-18 11:00 AM',
      location: 'Main Library',
      attendees: 40,
      rsvped: false,
      category: 'education',
    },

    // Social Events
    {
      id: 9,
      name: 'Alumni Meetup',
      dateTime: '2024-11-05 6:00 PM',
      location: 'Downtown Pub',
      attendees: 100,
      rsvped: false,
      category: 'social',
    },
    {
      id: 10,
      name: 'Student Club Fair',
      dateTime: '2024-11-08 12:00 PM',
      location: 'Student Union',
      attendees: 300,
      rsvped: false,
      category: 'social',
    },
    {
      id: 11,
      name: 'Movie Night',
      dateTime: '2024-11-20 8:00 PM',
      location: 'Outdoor Amphitheater',
      attendees: 150,
      rsvped: false,
      category: 'social',
    },
    {
      id: 12,
      name: 'Cultural Festival',
      dateTime: '2024-11-25 11:00 AM',
      location: 'Campus Green',
      attendees: 500,
      rsvped: false,
      category: 'social',
    },
  ])

  const handleRSVP = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, rsvped: !event.rsvped } : event
      )
    )
  }

  const careerEvents = events.filter((event) => event.category === 'career')
  const educationEvents = events.filter(
    (event) => event.category === 'education'
  )
  const socialEvents = events.filter((event) => event.category === 'social')

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left'>
        Upcoming Events
      </h1>

      <EventCategory
        title='Career Development'
        icon={<Briefcase className='w-6 h-6' />}
        events={careerEvents}
        onRSVP={handleRSVP}
      />

      <EventCategory
        title='Educational'
        icon={<GraduationCap className='w-6 h-6' />}
        events={educationEvents}
        onRSVP={handleRSVP}
      />

      <EventCategory
        title='Social'
        icon={<Coffee className='w-6 h-6' />}
        events={socialEvents}
        onRSVP={handleRSVP}
      />
    </div>
  )
}

export default Events
