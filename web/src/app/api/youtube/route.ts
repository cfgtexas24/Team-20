// app/api/youtube/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export async function GET() {
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&type=video&key=${YOUTUBE_API_KEY}`

  try {
    const response = await axios.get(youtubeApiUrl)

    const topVideos = response.data.items.map((item: any) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      image: item.snippet.thumbnails.default.url,
    }))

    return NextResponse.json(topVideos)
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube videos' },
      { status: 500 }
    )
  }
}
