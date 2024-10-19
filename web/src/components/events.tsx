'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import YoutubeVideos from './youtube-videos'
import { MapPin, MessageSquare, Award, DollarSign } from 'lucide-react'
import EventCard from './eventcard'
import { toast } from '@/hooks/use-toast'
import { usePoints } from '@/hooks/usePoints'

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

const HomeDashboard = () => {
  const [events, setEvents] = useState([
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
              href='/resources'
              icon={<MapPin className='w-5 h-5' />}
            >
              Find Resources
            </NavigationButton>
            <NavigationButton
              href='/meetings'
              icon={<MessageSquare className='w-5 h-5' />}
            >
              Talk with Mentor
            </NavigationButton>
            <NavigationButton
              href='/community-chat'
              icon={<Award className='w-5 h-5' />}
            >
              Community Chat
            </NavigationButton>
            <NavigationButton
              href='/rewards'
              icon={<DollarSign className='w-5 h-5' />}
            >
              Rewards
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
