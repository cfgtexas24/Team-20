'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'
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
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

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
      variant={pathname.includes(href.slice(1)) ? 'default' : 'ghost'}
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
            <NavButton href='/groups' icon={Users}>
              Groups
            </NavButton>
            <NavButton href='/livecall' icon={Users}>
              Live Call
            </NavButton>
            <NavButton href='/video' icon={Video}>
              Video
            </NavButton>
          </>
        )}
      </div>
    </>
  )

  const UserProfile = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div
      className={`flex items-center gap-2 ${
        isMobile
          ? ''
          : 'pl-2 pr-4 py-2 bg-[#8e94aa]/10 rounded-[999px] border border-[#8e94aa]/10'
      }`}
    >
      <Avatar>
        <AvatarImage src='/user.jpg' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {!isMobile && (
        <div className='flex flex-col'>
          <div className="text-[#040816] text-base font-bold font-['Inter'] leading-tight">
            Ephraim Sun
          </div>
          <div className="text-[#6d748a] text-xs font-normal font-['Inter'] leading-none">
            Pending
          </div>
        </div>
      )}
    </div>
  )

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
          <UserProfile isMobile />
        </div>
        <div className='flex items-center gap-4'>
          <div className="text-[#040816] text-sm font-semibold font-['Inter']">
            50 points
          </div>
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
      <div className='hidden lg:flex w-[280px] h-full p-4 bg-white  border border-l flex-col justify-between items-start gap-5'>
        <div className='flex flex-col w-full'>
          <NavContent />
        </div>
        {isLoading ? <Skeleton className='h-14 w-full' /> : <UserProfile />}
      </div>
    </>
  )
}

export default Sidebar
