'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import NotifyDialog from '@/components/notifyDialog'
import { Button } from '@/components/ui/button'
import { Calendar, Search, Users, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const Sidebar = () => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-[280px] h-full p-4 bg-white rounded-2xl border border-[#ccd2e8] flex-col justify-between items-start gap-5 flex'>
      <div className='flex flex-col w-full'>
        <div className='h-[156px] pb-5 border-b border-[#ccd2e8] flex-col justify-start items-start gap-1 flex'>
          <NotifyDialog />
          {isLoading ? (
            <>
              <Skeleton className='h-10 w-full mt-1' />
              <Skeleton className='h-10 w-full mt-1' />
            </>
          ) : (
            <>
              <Button
                variant={pathname.includes('events') ? 'default' : 'ghost'}
                className='self-stretch px-4 py-2 rounded-xl justify-start items-center gap-2 flex'
                asChild
              >
                <Link href='/events'>
                  <Calendar className='w-5 h-5 relative' />
                  <div className='grow shrink basis-0 h-6 p-1 justify-start items-center gap-3 flex'>
                    Events
                  </div>
                </Link>
              </Button>
              <Button
                variant={pathname.includes('search') ? 'default' : 'ghost'}
                className='self-stretch px-4 py-2 rounded-xl justify-start items-center gap-2 flex'
                asChild
              >
                <Link href='/search'>
                  <Search className='w-5 h-5 relative' />
                  <div className='grow shrink basis-0 h-6 p-1 justify-start items-center gap-3 flex'>
                    Search
                  </div>
                </Link>
              </Button>
            </>
          )}
        </div>
        <div className='flex flex-col justify-start items-start gap-1 '>
          {isLoading ? (
            <>
              <Skeleton className='h-10 w-full mt-1' />
              <Skeleton className='h-10 w-full mt-1' />
              <Skeleton className='h-10 w-full mt-1' />
            </>
          ) : (
            <>
              <Button
                variant={pathname.includes('groups') ? 'default' : 'ghost'}
                className='self-stretch px-4 py-2 rounded-xl justify-start items-center gap-2 flex'
                asChild
              >
                <Link href='/groups'>
                  <Users className='w-5 h-5 relative' />
                  <div className='grow shrink basis-0 h-6 p-1 justify-start items-center gap-3 flex'>
                    Groups
                  </div>
                </Link>
              </Button>
              <Button
                variant={pathname.includes('livecall') ? 'default' : 'ghost'}
                className='self-stretch px-4 py-2 rounded-xl justify-start items-center gap-2 flex'
                asChild
              >
                <Link href='/livecall'>
                  <Users className='w-5 h-5 relative' />
                  <div className='grow shrink basis-0 h-6 p-1 justify-start items-center gap-3 flex'>
                    Live Call
                  </div>
                </Link>
              </Button>
              <Button
                variant={pathname.includes('video') ? 'default' : 'ghost'}
                className='self-stretch px-4 py-2 rounded-xl justify-start items-center gap-2 flex'
                asChild
              >
                <Link href='/video'>
                  <Video className='w-5 h-5 relative' />
                  <div className='grow shrink basis-0 h-6 p-1 justify-start items-center gap-3 flex'>
                    Video
                  </div>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {isLoading ? (
        <Skeleton className='h-14 w-full' />
      ) : (
        <div className='pl-2 pr-4 py-2 bg-[#8e94aa]/10 rounded-[999px] border border-[#8e94aa]/10 justify-start items-center gap-2 flex'>
          <div className='grow shrink basis-0 h-9 justify-start items-center gap-2 flex'>
            <div className='flex-col justify-start items-start gap-2 flex'>
              <Avatar>
                <AvatarImage src='/user.jpg' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='pl-1 pr-2 flex-col justify-start items-start flex'>
              <div className='justify-start items-center gap-2 flex'>
                <div className="text-[#040816] text-base font-bold font-['Inter'] leading-tight">
                  Ephraim Sun
                </div>
              </div>
              <div className="text-[#6d748a] text-xs font-normal font-['Inter'] leading-none">
                Pending
              </div>
            </div>
          </div>
          <div className='justify-start items-start flex'>
            <div className='w-5 h-5 relative'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
