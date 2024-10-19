import { NextResponse } from 'next/server'
import axios from 'axios'

import { env } from '@/env.mjs'

const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY

export async function GET() {
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=financial+advisor+advice&type=video&key=${YOUTUBE_API_KEY}`

  try {
    const response = await axios.get(youtubeApiUrl)

    const educationalVideos = response.data.items.map((item: any) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      image: item.snippet.thumbnails.medium.url, // Using medium size for better quality
    }))

    return NextResponse.json(educationalVideos)
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch educational videos for veterans' },
      { status: 500 }
    )
  }
}
