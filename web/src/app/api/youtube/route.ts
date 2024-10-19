import { NextResponse } from 'next/server'
import axios from 'axios'

import { env } from '@/env.mjs'

const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY

export async function GET() {
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=financial+advisor+advice&type=video&key=${YOUTUBE_API_KEY}`

  try {
    // const response = await axios.get(youtubeApiUrl)

    const response = {
      kind: 'youtube#searchListResponse',
      etag: 'qpnGRWq62kgRHoiPhUvDA2x80ck',
      nextPageToken: 'CAoQAA',
      regionCode: 'ZZ',
      pageInfo: {
        totalResults: 1000000,
        resultsPerPage: 10,
      },
      items: [
        {
          kind: 'youtube#searchResult',
          etag: 'XGBsLAVJd2fxVRr40wsH1PmupPA',
          id: {
            kind: 'youtube#video',
            videoId: '8oleDqSwgX0',
          },
          snippet: {
            publishedAt: '2021-10-18T23:35:00Z',
            channelId: 'UCjVbULafeplOeL_wva3i1DQ',
            title: 'Financial Advisors BEST Advice for NEW Financial Advisors',
            description:
              'Today we talk about the best advice I can give to new financial advisors just getting started in the industry. These tips would have ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/8oleDqSwgX0/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/8oleDqSwgX0/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/8oleDqSwgX0/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Josh Olfert, CFP',
            liveBroadcastContent: 'none',
            publishTime: '2021-10-18T23:35:00Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'nre7D0OuaCcsrYGrCT8BDi2MPPA',
          id: {
            kind: 'youtube#video',
            videoId: 'xqcPUU6DXI0',
          },
          snippet: {
            publishedAt: '2021-05-12T20:00:28Z',
            channelId: 'UCJ-_I3IYY-nPzvg_gT7BO0Q',
            title:
              'Do I Really Need A Financial Advisor? When To Hire A Financial Advisor',
            description:
              "If you're thinking about working with a financial advisor, make sure you watch this video. It can help give you a few scenarios of ...",
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/xqcPUU6DXI0/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/xqcPUU6DXI0/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/xqcPUU6DXI0/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Streamline Financial',
            liveBroadcastContent: 'none',
            publishTime: '2021-05-12T20:00:28Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'jGVFbDDpB_avH0h3RRdpHCjBnOg',
          id: {
            kind: 'youtube#video',
            videoId: '402G2IVhGbI',
          },
          snippet: {
            publishedAt: '2022-06-27T18:00:02Z',
            channelId: 'UC39PLqUmy-AKK5HGYYfwFYw',
            title:
              '6 Things You Should Know BEFORE You See A FINANCIAL ADVISER',
            description:
              "I've spent more than ten years on this channel trying to equip people to organise their own finances so that they don't need a ...",
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/402G2IVhGbI/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/402G2IVhGbI/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/402G2IVhGbI/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'MeaningfulMoney',
            liveBroadcastContent: 'none',
            publishTime: '2022-06-27T18:00:02Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: '3kWZmZ85zVpbHU8SyPah4Wred6E',
          id: {
            kind: 'youtube#video',
            videoId: 'pZNnueqfj_A',
          },
          snippet: {
            publishedAt: '2023-11-19T16:00:27Z',
            channelId: 'UCFBpVaKCC0ajGps1vf0AgBg',
            title:
              'FINANCIAL ADVISOR Explains: Retirement Plans for Beginners (401k, IRA, Roth 401k/IRA, 403b) 2024',
            description:
              'In this video I go over an overview of retirement plans including the 401k, the IRA, the Roth versions (Roth 401k and IRA), as well ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/pZNnueqfj_A/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/pZNnueqfj_A/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/pZNnueqfj_A/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Humphrey Yang',
            liveBroadcastContent: 'none',
            publishTime: '2023-11-19T16:00:27Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'sMokiyvsoKsFx9TLVpEOhag5omM',
          id: {
            kind: 'youtube#video',
            videoId: 'bZdsJ84otzI',
          },
          snippet: {
            publishedAt: '2021-04-11T21:00:07Z',
            channelId: 'UC7eBNeDW1GQf2NJQ6G6gAxw',
            title: 'When Should I Hire a Financial Advisor?',
            description:
              'Create Your Free Budget! Sign up for EveryDollar ⮕ https://ter.li/6h2c45 Download the Ramsey Network App ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/bZdsJ84otzI/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/bZdsJ84otzI/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/bZdsJ84otzI/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'The Ramsey Show Highlights',
            liveBroadcastContent: 'none',
            publishTime: '2021-04-11T21:00:07Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'KewbA2n-h8RmerVJJ1CEwAtty2Q',
          id: {
            kind: 'youtube#video',
            videoId: 'JdUKhgW1gOo',
          },
          snippet: {
            publishedAt: '2016-04-14T23:43:01Z',
            channelId: 'UC6ZFN9Tx6xh-skXCuRHCDpQ',
            title:
              'All the financial advice you’ll ever need fits on a single index card',
            description:
              'Watch more from Making Sen$e: https://bit.ly/2D8w9kc Read more economic news: ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/JdUKhgW1gOo/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/JdUKhgW1gOo/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/JdUKhgW1gOo/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'PBS NewsHour',
            liveBroadcastContent: 'none',
            publishTime: '2016-04-14T23:43:01Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: '1KbZML2W0maqqD2Pf9ENbzYQiqI',
          id: {
            kind: 'youtube#video',
            videoId: 'Tv4ywFaISMo',
          },
          snippet: {
            publishedAt: '2021-04-19T13:45:01Z',
            channelId: 'UCQLbMunk1Hshesv1-USEj2w',
            title:
              'Advisors, Start Your Meetings With These Questions. Financial Advisor Training.',
            description:
              'Financial Advisors, print the first meeting questions one-pager for your next meeting ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/Tv4ywFaISMo/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/Tv4ywFaISMo/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/Tv4ywFaISMo/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Streamline My Practice: For Financial Advisors',
            liveBroadcastContent: 'none',
            publishTime: '2021-04-19T13:45:01Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'HPi47ud-hhwdM72r6LcWE5Tr3II',
          id: {
            kind: 'youtube#video',
            videoId: 'iaZduy748Xc',
          },
          snippet: {
            publishedAt: '2022-08-10T21:00:19Z',
            channelId: 'UCQLbMunk1Hshesv1-USEj2w',
            title:
              'How to Answer &quot;What Do You Do?&quot; Financial Advisor Tip for Marketing &amp; Communication',
            description:
              'Advisors, What do you say when someone asks you "So, What do you do?" I used to want to have a compelling response but then ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/iaZduy748Xc/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/iaZduy748Xc/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/iaZduy748Xc/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Streamline My Practice: For Financial Advisors',
            liveBroadcastContent: 'none',
            publishTime: '2022-08-10T21:00:19Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'Rbji7RAlyApAoEdQXHoVxMy5gyc',
          id: {
            kind: 'youtube#video',
            videoId: 'r3k7Zaj6vJo',
          },
          snippet: {
            publishedAt: '2024-10-17T04:00:38Z',
            channelId: 'UC5_anD5eWOIYJhGpz-se5XQ',
            title:
              'How Santa Can Help Financial Advisors Create Growth #financialadvisormarketing',
            description:
              'House Rules Playlist: https://www.youtube.com/playlist?list=PLFBdHoHsCOFwGEnqJKaDhR3cogV7a1WSg: ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/r3k7Zaj6vJo/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/r3k7Zaj6vJo/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/r3k7Zaj6vJo/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Impact Partnership',
            liveBroadcastContent: 'none',
            publishTime: '2024-10-17T04:00:38Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'FSL36AlpxrkeHDZLR4y5jkDK7NQ',
          id: {
            kind: 'youtube#video',
            videoId: '3XheE7_bEq4',
          },
          snippet: {
            publishedAt: '2021-12-24T19:35:21Z',
            channelId: 'UCKmmERguliWTynG9OIoDhDw',
            title:
              'Don&#39;t Get Finessed By Your Financial Advisor #Shorts #finance  #money',
            description:
              'Watch out for a financial advisor that says this! ⚖️ Questions? Issues? Contact Me: https://lawbymike.com OR TEXT ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/3XheE7_bEq4/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/3XheE7_bEq4/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/3XheE7_bEq4/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Law By Mike',
            liveBroadcastContent: 'none',
            publishTime: '2021-12-24T19:35:21Z',
          },
        },
      ],
    }

    const educationalVideos = response.items.map((item: any) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      image: item.snippet.thumbnails.medium.url, // Using medium size for better quality
    }))

    return NextResponse.json(educationalVideos)
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch educational videos' },
      { status: 500 }
    )
  }
}
