import { CalendarDays, MapPin, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'

const EventCard = ({
  event,
  onRSVP,
}: {
  event: any
  onRSVP: (id: number) => void
}) => (
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
    <div className='flex flex-col space-y-2'>
      <Button
        onClick={() => onRSVP(event.id)}
        variant={event.rsvped ? 'secondary' : 'default'}
        className='w-full'
      >
        {event.rsvped ? 'Cancel RSVP' : 'RSVP'}
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

export default EventCard
