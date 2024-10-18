// components/YoutubeVideos.tsx
'use client'

import { useEffect, useState } from 'react'

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
    // Fetch the data from the Next.js API route
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
  }, []) // The empty dependency array ensures the effect runs only once after the initial render

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Top 10 YouTube Videos</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <a href={video.link} target='_blank' rel='noopener noreferrer'>
              <img
                src={video.image}
                alt={video.title}
                style={{ width: '120px', height: '90px', marginRight: '10px' }}
              />
              <span>{video.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default YoutubeVideos
