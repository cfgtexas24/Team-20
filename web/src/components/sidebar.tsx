'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import NotifyDialog from '@/components/notifyDialog'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Search,
  Users,
  Video,
  Menu,
  X,
  LucideIcon,
  Bell,
  Map,
  CircleDollarSign,
  Award,
  ScanQrCode,
  BookText,
  Projector,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface NavButtonProps {
  href: string
  icon: LucideIcon
  children: ReactNode
}

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser()

  const [earnedPoints, setEarnedPoints] = useState<number>(0)

  useEffect(() => {
    if (isUserLoaded && isSignedIn) {
      const points = user.publicMetadata.points as number
      setEarnedPoints(points || 0)
      setIsLoading(false)
    } else if (isUserLoaded && !isSignedIn) {
      setIsLoading(false)
    }
  }, [isUserLoaded, isSignedIn, user])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  const NavButton = ({ href, icon: Icon, children }: NavButtonProps) => (
    <Button
      variant={pathname?.includes(href.slice(1)) ? 'default' : 'ghost'}
      className='self-stretch px-4 py-2 rounded-xl justify-start items-center gap-2 flex'
      onClick={() => handleNavigation(href)}
    >
      <Icon className='w-5 h-5 relative' />
      <div className='grow shrink basis-0 h-6 p-1 justify-start items-center gap-3 flex'>
        {children}
      </div>
    </Button>
  )

  const NavContent = () => (
    <>
      <div className='pb-5 border-b border-[#ccd2e8] flex-col justify-start items-start gap-1 flex'>
        <NotifyDialog />
        {isLoading ? (
          <>
            <Skeleton className='h-10 w-full mt-1' />
            <Skeleton className='h-10 w-full mt-1' />
          </>
        ) : (
          <>
            <NavButton href='/events' icon={Calendar}>
              Events
            </NavButton>
            <NavButton href='/search' icon={Search}>
              Search
            </NavButton>
          </>
        )}
      </div>
      <div className='flex flex-col justify-start items-start gap-1 mt-5'>
        {isLoading ? (
          <>
            <Skeleton className='h-10 w-full mt-1' />
            <Skeleton className='h-10 w-full mt-1' />
            <Skeleton className='h-10 w-full mt-1' />
          </>
        ) : (
          <>
            <NavButton href='/community-chat' icon={Users}>
              Community Chat
            </NavButton>
            <NavButton href='/meetings' icon={Projector}>
              Mentor Meetings
            </NavButton>
            <NavButton href='/resources' icon={Map}>
              Resources
            </NavButton>
            <NavButton href='/rewards' icon={CircleDollarSign}>
              Rewards
            </NavButton>
            <NavButton href='/qr-code' icon={ScanQrCode}>
              My Pass
            </NavButton>
            <NavButton href='/forms' icon={BookText}>
              User Onboarding
            </NavButton>
          </>
        )}
      </div>
    </>
  )

  const UserInfo = () => {
    if (!isUserLoaded) {
      return <Skeleton className='h-10 w-full' />
    }
    return (
      <div className='flex items-center gap-3 bg-[#8e94aa]/10 p-2 rounded-[999px] w-full'>
        <UserButton afterSignOutUrl='/' />
        <div className='flex flex-col overflow-hidden'>
          <span className="text-[#040816] text-sm font-semibold font-['Inter'] truncate">
            {user?.fullName}
          </span>
          <span className="text-[#6d748a] text-xs font-normal font-['Inter'] truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className='lg:hidden fixed top-0 left-0 w-full bg-white z-50 p-4 flex justify-between items-center border-b border-[#ccd2e8]'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <UserButton afterSignOutUrl='/' />
        </div>
        <div className='flex items-center gap-4'>
          <Link href='/rewards' passHref>
            <div className='px-3 py-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200 flex items-center gap-2 cursor-pointer'>
              <Award className='w-4 h-4 text-yellow-600' />
              <div className="text-yellow-700 text-sm font-semibold font-['Inter']">
                {earnedPoints} points
              </div>
            </div>
          </Link>
          <Button size='icon' variant='outline'>
            <Bell className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className='lg:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-white z-40 p-4 flex flex-col'>
          <NavContent />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className='hidden lg:flex w-[280px] h-full p-4 bg-white border border-l flex-col justify-between items-start gap-5'>
        <div className='flex flex-col w-full'>
          <NavContent />
        </div>
        <UserInfo />
      </div>
    </>
  )
}

export default Sidebar
