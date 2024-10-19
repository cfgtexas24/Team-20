import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='pl-2 pr-10 py-4 justify-between items-center inline-flex w-full bg-white shadow-sm'>
      <div className='grow shrink basis-0 h-10 px-4 justify-start items-center gap-2 flex'>
        <Link href='/'>
          <Image src={'/logo.png'} alt='logo' width={150} height={50} />
        </Link>
      </div>
      <div className='grow shrink basis-0 h-14 px-20 justify-start items-center gap-2 flex'></div>
      <div className='justify-end items-center gap-2 flex'>
        <Link href='/rewards' passHref>
          <div className='px-3 py-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200 flex items-center gap-2 cursor-pointer'>
            <Award className='w-5 h-5 text-yellow-600' />
            <div className="text-yellow-700 text-sm font-semibold font-['Inter']">
              50 Points
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
