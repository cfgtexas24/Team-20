import React from 'react'
import { MainNav } from './main-nav'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='pl-2 pr-10 py-4 justify-between items-center inline-flex  w-full'>
      <div className='grow shrink basis-0 h-10 px-4 justify-start items-center gap-2 flex'>
        <Link href='/'>
          <Image src={'/logo.png'} alt='logo' width={150} height={50} />
        </Link>
      </div>
      <div className='grow shrink basis-0 h-14 px-20 justify-start items-center gap-2 flex'>
        {/* <div className='grow shrink basis-0 flex-col justify-start items-start inline-flex'>
          <div className='self-stretch h-14 rounded-2xl flex-col justify-center items-start gap-2 flex'>
            <div className='self-stretch h-14 rounded-2xl flex-col justify-start items-start flex'>
              <div className='self-stretch h-14 px-4 py-2 bg-white/0 rounded-2xl border border-[#ccd2e8] justify-start items-center gap-3 inline-flex'>
                <div className='grow shrink basis-0 flex-col justify-start items-start inline-flex'>
                  <div className="text-[#6d748a] text-xs font-normal font-['Inter'] leading-none">
                    Company
                  </div>
                  <div className="text-[#040816] text-base font-normal font-['Inter'] leading-tight">
                    Once UI
                  </div>
                </div>
                <div className='justify-start items-start flex'>
                  <div className='w-6 h-6 relative'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grow shrink basis-0 flex-col justify-start items-start inline-flex'>
          <div className='self-stretch h-14 rounded-2xl flex-col justify-center items-start gap-2 flex'>
            <div className='self-stretch h-14 rounded-2xl flex-col justify-start items-start flex'>
              <div className='self-stretch h-14 px-4 py-2 bg-white/0 rounded-2xl border border-[#ccd2e8] justify-start items-center gap-3 inline-flex'>
                <div className='grow shrink basis-0 flex-col justify-start items-start inline-flex'>
                  <div className="text-[#6d748a] text-xs font-normal font-['Inter'] leading-none">
                    Service
                  </div>
                  <div className="text-[#040816] text-base font-normal font-['Inter'] leading-tight">
                    Tokens
                  </div>
                </div>
                <div className='justify-start items-start flex'>
                  <div className='w-6 h-6 relative'></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className='justify-end items-center gap-2 flex'>
        <div className='px-1 rounded-lg justify-center items-center gap-2 flex'>
          <div className='justify-start items-start flex'>
            <div className='w-5 h-5 relative'></div>
          </div>
          <div className="text-[#393f55] text-[14.80px] font-normal font-['Inter'] leading-tight">
            50 Points
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
