'use client'

import EventsPage from '@/components/events'
import YoutubeVideos from '@/components/youtube-videos'
import PlaceComponent from './Autocomplete.jsx';

const MyPage = () => {
  return (
    <>
    <div className='w-full'>
      {/* <h1>Welcome to YouTube Video Fetcher</h1> */}
      {/* <YoutubeVideos /> */}
      <EventsPage />
    </div>
    <div>
      <p>My Page</p>
      <PlaceComponent />
    </div>
    </>
  );
};

export default MyPage;
