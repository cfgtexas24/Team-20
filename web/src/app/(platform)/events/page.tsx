'use client'

import { useState } from 'react'
import { Briefcase, GraduationCap, Heart, Gift } from 'lucide-react'
import EventCard from '@/components/eventcard'
import { toast } from '@/hooks/use-toast'
import { usePoints } from '@/hooks/usePoints'

interface Event {
  id: number
  name: string
  dateTime: string
  location: string
  description: string
  category: string
  attendees?: number
  rsvped: boolean
  link?: string
  points: number
}

const EventCategory = ({
  title,
  icon,
  events,
  onRSVP,
}: {
  title: string
  icon: React.ReactNode
  events: Event[]
  onRSVP: (id: number, points: number) => Promise<void>
}) => (
  <div className='mb-8'>
    <h2 className='text-2xl font-bold mb-4 flex items-center'>
      {icon}
      <span className='ml-2'>{title}</span>
    </h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRSVP={(id, points) => onRSVP(id, points)}
        />
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
      link: 'https://www.stormcohs.org/copy-of-events39393a52',
      points: 300,
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
      link: 'https://www.stormcohs.org/newpage9ec8a741',
      points: 200,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
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
      link: 'https://www.stormcohs.org/',
      points: 100,
    },
  ])

  const { addPoints, subtractPoints } = usePoints()

  const handleRSVP = async (eventId: number, points: number) => {
    try {
      const event = events.find((e) => e.id === eventId)
      if (!event) throw new Error('Event not found')

      const action = event.rsvped ? 'subtract' : 'add'

      // Update points on the server
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          amount: points,
        }),
      })

      if (!response.ok) throw new Error('Failed to update points')

      // Update local state
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, rsvped: !event.rsvped } : event
        )
      )

      // Update global points state
      if (action === 'add') {
        addPoints(points)
      } else {
        subtractPoints(points)
      }

      // Show success toast
      toast({
        title: event.rsvped ? 'RSVP Cancelled' : 'RSVP Confirmed',
        description: event.rsvped
          ? `You've cancelled your RSVP for ${event.name}.`
          : `You've RSVP'd for ${event.name} and earned ${points} points!`,
      })
    } catch (error) {
      console.error('Error updating RSVP:', error)
      toast({
        title: 'Error',
        description: 'Failed to update RSVP. Please try again.',
        variant: 'destructive',
      })
    }
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
