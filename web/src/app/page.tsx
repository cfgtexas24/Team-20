import EventsPage from '@/components/events'
import YoutubeVideos from '@/components/youtube-videos'

export default function Home() {
  return (
    <div className='w-full'>
      {/* <h1>Welcome to YouTube Video Fetcher</h1> */}
      {/* <YoutubeVideos /> */}
      <EventsPage />
    </div>
  )
}
