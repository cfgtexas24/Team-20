'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Gift,
} from 'lucide-react'

interface Event {
  id: number
  name: string
  dateTime: string
  location: string
  description: string
  category: string
  attendees?: number
  rsvped: boolean
}

const EventCard = ({
  event,
  onRSVP,
}: {
  event: Event
  onRSVP: (id: number) => void
}) => (
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
    {event.attendees && (
      <p className='text-gray-600 text-sm mb-4 flex items-center'>
        <Users className='w-4 h-4 mr-2' />
        {event.attendees} attendees
      </p>
    )}
    <p className='text-gray-700 text-sm mb-4'>{event.description}</p>
    <Button
      onClick={() => onRSVP(event.id)}
      variant={event.rsvped ? 'secondary' : 'default'}
      className='w-full'
    >
      {event.rsvped ? 'Cancel RSVP' : 'RSVP'}
    </Button>
  </div>
)

const EventCategory = ({
  title,
  icon,
  events,
  onRSVP,
}: {
  title: string
  icon: React.ReactNode
  events: Event[]
  onRSVP: (id: number) => void
}) => (
  <div className='mb-8'>
    <h2 className='text-2xl font-bold mb-4 flex items-center'>
      {icon}
      <span className='ml-2'>{title}</span>
    </h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onRSVP={onRSVP} />
      ))}
    </div>
  </div>
)

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    // STORM Flagship Events
    {
      id: 1,
      name: 'Grit & Growth 2024',
      dateTime: '2024-11-09',
      location: 'STORM Center',
      description:
        "STORM's 3rd Annual Grit & Growth Community Experience: 'Who I Choose to Become, I Will Become'. Join us for a day of inspiration and transformation!",
      category: 'flagship',
      rsvped: false,
    },
    {
      id: 2,
      name: 'North Texas Giving Day 2024',
      dateTime: '2024-09-19',
      location: 'Online',
      description:
        'Support STORM during North Texas Giving Day! Your donations help us continue providing free services to youth and young adults.',
      category: 'flagship',
      rsvped: false,
    },

    // Community Service Events
    {
      id: 3,
      name: 'Holiday Toy Drive',
      dateTime: '2024-12-10 10:00 AM',
      location: 'STORM Center',
      description:
        'Donate new, unwrapped toys to bring joy to children in need this holiday season.',
      category: 'community',
      rsvped: false,
    },
    {
      id: 4,
      name: 'Winter Coat Collection',
      dateTime: '2024-11-15 - 2024-12-15',
      location: 'Various Locations',
      description:
        'Help keep our community warm by donating new or gently used winter coats.',
      category: 'community',
      rsvped: false,
    },
    {
      id: 5,
      name: 'Community Food Drive',
      dateTime: '2024-10-05 9:00 AM',
      location: 'Local Food Bank',
      description:
        'Join us in collecting non-perishable food items to stock our local food banks.',
      category: 'community',
      rsvped: false,
    },

    // Career Development Events
    {
      id: 6,
      name: 'Career Fair',
      dateTime: '2024-10-25 1:00 PM',
      location: 'STORM Center',
      attendees: 500,
      description:
        'Connect with local employers and explore career opportunities.',
      category: 'career',
      rsvped: false,
    },
    {
      id: 7,
      name: 'Resume Workshop',
      dateTime: '2024-11-02 2:00 PM',
      location: 'Online',
      attendees: 100,
      description:
        'Learn how to create a standout resume that gets you noticed by employers.',
      category: 'career',
      rsvped: false,
    },

    // Educational Events
    {
      id: 8,
      name: 'Financial Literacy Seminar',
      dateTime: '2024-11-05 3:00 PM',
      location: 'STORM Center',
      attendees: 75,
      description:
        'Gain essential knowledge about personal finance, budgeting, and saving.',
      category: 'education',
      rsvped: false,
    },
    {
      id: 9,
      name: 'Study Skills Workshop',
      dateTime: '2024-11-12 1:00 PM',
      location: 'Online',
      attendees: 60,
      description:
        'Improve your study habits and learn effective techniques for academic success.',
      category: 'education',
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

  const flagshipEvents = events.filter((event) => event.category === 'flagship')
  const communityEvents = events.filter(
    (event) => event.category === 'community'
  )
  const careerEvents = events.filter((event) => event.category === 'career')
  const educationEvents = events.filter(
    (event) => event.category === 'education'
  )

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left'>
        Upcoming Events
      </h1>

      <EventCategory
        title='STORM Flagship Events'
        icon={<Heart className='w-6 h-6 text-red-500' />}
        events={flagshipEvents}
        onRSVP={handleRSVP}
      />

      <EventCategory
        title='Community Service'
        icon={<Gift className='w-6 h-6 text-green-500' />}
        events={communityEvents}
        onRSVP={handleRSVP}
      />

      <EventCategory
        title='Career Development'
        icon={<Briefcase className='w-6 h-6 text-blue-500' />}
        events={careerEvents}
        onRSVP={handleRSVP}
      />

      <EventCategory
        title='Educational'
        icon={<GraduationCap className='w-6 h-6 text-purple-500' />}
        events={educationEvents}
        onRSVP={handleRSVP}
      />
    </div>
  )
}

export default Events
