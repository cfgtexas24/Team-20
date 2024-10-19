'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Video {
  title: string
  link: string
  image: string
}

const YoutubeVideos = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube')
        const data = await response.json()

        if (response.ok) {
          setVideos(data)
        } else {
          setError(data.error || 'Failed to fetch videos')
        }
      } catch (err) {
        setError('An error occurred while fetching videos')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className='w-full mb-4 md:mb-8'>
        <h2 className='text-xl md:text-2xl font-bold mb-2 md:mb-4 px-4 md:px-0'>
          Educational Videos for Veterans
        </h2>
        <div className='flex space-x-3 md:space-x-4 overflow-x-auto pb-4 px-4 md:px-0'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='flex-none w-60 md:w-72 animate-pulse'>
              <div className='bg-gray-300 rounded-lg h-32 md:h-40 mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-3/4'></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full mb-4 md:mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mx-4 md:mx-0'>
        <h2 className='text-xl md:text-2xl font-bold mb-2'>Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className='w-full mb-4 md:mb-8'>
      <h2 className='text-xl md:text-2xl font-bold mb-2 md:mb-4 px-4 md:px-0'>
        Educational Videos for Veterans
      </h2>
      <div className='overflow-x-auto pb-4 -mx-4 md:mx-0'>
        <div
          className='flex space-x-3 md:space-x-4 px-4 md:px-0'
          style={{ paddingRight: 'calc(100vw - 100%)' }}
        >
          {videos.map((video, index) => (
            <div key={index} className='flex-none w-60 md:w-72'>
              <a
                href={video.link}
                target='_blank'
                rel='noopener noreferrer'
                className='block'
              >
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <div className='relative h-32 md:h-40'>
                    <Image
                      src={video.image}
                      alt={video.title}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className='p-3 md:p-4'>
                    <h3 className='text-base md:text-lg font-semibold truncate'>
                      {video.title}
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YoutubeVideos
