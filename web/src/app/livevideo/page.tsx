"use client"; // Add this line at the very top

import { useEffect } from 'react';
import { useDyteClient, DyteProvider } from '@dytesdk/react-web-core';
import MyMeeting from '../../LiveVideoComponents/MyMeeting';

export default function LiveVideoPage() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const authToken1 = process.env.NEXT_PUBLIC_AUTH_TOKEN;
    console.log(authToken1);

    if (authToken1) {
      initMeeting({
        authToken: authToken1,
        defaults: {
          audio: false,
          video: false,
        },
      });
    }
  }, []);

  return (
    <DyteProvider value={meeting} fallback={<i>Loading...</i>}>
      <MyMeeting />
    </DyteProvider>
  );
}
