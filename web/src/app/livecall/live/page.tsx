"use client";

import { useEffect } from 'react';
import { useDyteClient, DyteProvider } from '@dytesdk/react-web-core';
import MyMeeting from '../../../LiveVideoComponents/MyMeeting';
import './livevideo.css'; // imports css from live video css file

export default function LiveVideoPage() {
  // use Dtye Client
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    // Grabs token from local env for security purposes
    const authToken1 = process.env.NEXT_PUBLIC_AUTH_TOKEN; 

    if (authToken1) {
      initMeeting({
        authToken: authToken1,
        // auto set audio / video off when you join the meeting
        defaults: {
          audio: false,
          video: false,
        },
      });
    }
  }, []);

  return (
    <div className="live-video-container">
      <DyteProvider value={meeting} fallback={<i>Loading...</i>}>
        <MyMeeting />
      </DyteProvider>
    </div>
  );
}
