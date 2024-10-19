import React from 'react'
import { Button } from '@/components/ui/button'
import YoutubeVideos from './youtube-videos'

interface EventItemProps {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  additionalContent?: React.ReactNode
}

const EventItem: React.FC<EventItemProps> = ({
  icon,
  title,
  description,
  buttonText,
  additionalContent,
}) => (
  <div className='self-stretch p-6 bg-[#8e94aa]/10 rounded-2xl border border-[#8e94aa]/10 justify-start items-center gap-6 inline-flex'>
    <div className='p-2 bg-gradient-to-b from-[#e0effc] to-[#ddcbfb] rounded-[999px] border border-[#b07afa]/50 flex-col justify-start items-start gap-2 inline-flex'>
      {icon}
    </div>
    <div className='grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex'>
      <div className='self-stretch text-[#393f55] text-lg font-bold'>
        {title}
      </div>
      <div className='self-stretch text-[#6d748a] text-sm'>{description}</div>
      {additionalContent}
    </div>
    <Button
      variant='outline'
      className='px-2 py-1 bg-[#e9edfe] rounded-2xl shadow-inner border border-[#8e94aa]/30'
    >
      {buttonText}
    </Button>
  </div>
)

interface SectionProps {
  title: string
  description: string
  children: React.ReactNode
  actionButton?: React.ReactNode
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  actionButton,
}) => (
  <div className='self-stretch flex-col justify-start items-start gap-10 flex'>
    <div className='self-stretch justify-start items-start gap-6 inline-flex'>
      <div className='grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex'>
        <div className='self-stretch h-[66px] flex-col justify-start items-start gap-2 flex'>
          <div className='self-stretch justify-start items-center gap-3 inline-flex'>
            <div className='justify-start items-center gap-1 flex'>
              <div className='text-[#040816] text-[32px] font-black'>
                {title}
              </div>
            </div>
          </div>
          <div className='self-stretch text-[#393f55] text-sm'>
            {description}
          </div>
        </div>
      </div>
      {actionButton}
    </div>
    <div className='self-stretch flex-col justify-start items-start gap-4 flex'>
      {children}
    </div>
  </div>
)

const EventsPage: React.FC = () => {
  const currentEvents = [
    {
      icon: <div className='w-4 h-4 relative'></div>,
      title: 'Select and replace',
      description:
        'Select all entities that match your query and replace them with an input',
      buttonText: 'Set up',
    },
    {
      icon: <div className='w-4 h-4 relative'></div>,
      title: 'Schedule maintenance',
      description: 'Schedule maintenance for when the app will shut down',
      buttonText: 'Schedule',
    },
    {
      icon: <div className='w-4 h-4 relative'></div>,
      title: 'Fix broken nodes',
      description: 'Run analyzis and fix broken entities',
      buttonText: 'Run analyzis',
    },
  ]

  const previousEvents = [
    {
      icon: <div className='w-4 h-4 relative'></div>,
      title: 'Select and replace',
      description: '',
      buttonText: 'View logs',
      additionalContent: (
        <div className='justify-start items-center gap-2 inline-flex'>
          <div className='h-[26px] px-2 py-1 bg-white rounded-lg border border-[#ccd2e8] justify-center items-center flex'>
            <div className='text-[#6d748a] text-sm'>neutral-grey-600</div>
          </div>
          <div className='text-[#0a071b] text-sm'>-&gt;</div>
          <div className='h-[26px] px-2 py-1 bg-white rounded-lg border border-[#ccd2e8] justify-center items-center flex'>
            <div className='text-[#6d748a] text-sm'>neutral-grey-600</div>
          </div>
        </div>
      ),
    },
    // Add more previous events as needed
  ]

  return (
    <div className='w-full flex-col justify-start items-start gap-20 inline-flex'>
      <Section
        title='Events'
        description='Create and manage events'
        actionButton={
          <Button
            variant='secondary'
            className='px-3 py-2 bg-[#e9edfe] rounded-xl shadow-inner border border-[#8e94aa]/30'
          >
            New event
          </Button>
        }
      >
        {currentEvents.map((event, index) => (
          <EventItem key={index} {...event} />
        ))}
      </Section>

      <Section title='Previous events' description='View past events'>
        {previousEvents.map((event, index) => (
          <EventItem key={index} {...event} />
        ))}
      </Section>

      <YoutubeVideos />
    </div>
  )
}

export default EventsPage
