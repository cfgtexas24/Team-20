import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteMeeting } from '@dytesdk/react-web-core';

export default function MyMeeting() {
  const { meeting } = useDyteMeeting();

  return (
    <div style={{ height: '480px' }}>
      <DyteMeeting mode="fill" meeting={meeting} />
    </div>
  );
}
