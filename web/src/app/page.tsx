import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen p-8'>
      <h1>Welcome to the Zoom Page!</h1>
      <Link href='/livevideo' className='text-blue-500 underline'>
        Join a Zoom-like Meeting
      </Link>
    </div>
  );
}
