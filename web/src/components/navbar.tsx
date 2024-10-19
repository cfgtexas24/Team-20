'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Menu } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { usePoints } from '@/hooks/usePoints'

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { points, setPoints } = usePoints()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const userPoints = user.publicMetadata.points as number
      setPoints(userPoints || 0)
    }
  }, [isLoaded, isSignedIn, user, setPoints])

  return (
    <nav className='flex flex-row w-full bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white '>
      <div className='w-full mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <button className='mr-2 md:hidden'>
            <Menu size={24} />
          </button>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='logo'
              width={120}
              height={40}
              className='max-h-8 w-auto'
            />
          </Link>
        </div>
        <Link href='/rewards' className='flex items-center'>
          <div className='px-3 py-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200 flex items-center gap-2 cursor-pointer'>
            <Award className='w-5 h-5 text-yellow-600' />
            <div className="text-yellow-700 text-sm font-semibold font-['Inter']">
              {points} Points
            </div>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
