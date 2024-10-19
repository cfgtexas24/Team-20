import { CalendarDays, MapPin, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

interface Event {
  id: number
  name: string
  dateTime: string
  location: string
  rsvped: boolean
  link?: string
  points: number
}

const EventCard = ({
  event,
  onRSVP,
}: {
  event: Event
  onRSVP: (id: number, points: number) => Promise<void>
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRSVP = async () => {
    setIsLoading(true)
    try {
      await onRSVP(event.id, event.points)
      toast({
        title: event.rsvped ? 'RSVP Cancelled' : 'RSVP Confirmed',
        description: event.rsvped
          ? `You've cancelled your RSVP for ${event.name}.`
          : `You've RSVP'd for ${event.name} and earned ${event.points} points!`,
      })
    } catch (error) {
      console.error('Error updating RSVP:', error)
      toast({
        title: 'Error',
        description: 'Failed to update RSVP. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
      <h2 className='text-lg font-bold mb-2'>{event.name}</h2>
      <p className='text-gray-600 text-sm mb-2 flex items-center'>
        <CalendarDays className='w-4 h-4 mr-2' />
        {event.dateTime}
      </p>
      <p className='text-gray-600 text-sm mb-2 flex items-center'>
        <MapPin className='w-4 h-4 mr-2' />
        {event.location}
      </p>
      <p className='text-gray-600 text-sm mb-4'>
        Points for RSVP: {event.points}
      </p>
      <div className='flex flex-col space-y-2'>
        <Button
          onClick={handleRSVP}
          variant={event.rsvped ? 'secondary' : 'default'}
          className='w-full'
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : event.rsvped ? 'Cancel RSVP' : 'RSVP'}
        </Button>
        {event.link && (
          <a
            href={event.link}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full'
          >
            <Button variant='outline' className='w-full'>
              Learn More <ExternalLink className='w-4 h-4 ml-2' />
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default EventCard
