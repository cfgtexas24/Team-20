'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Info } from 'lucide-react'

const content = [
  {
    title: 'About Us',
    content:
      'Storm Center of Hope & Service, Inc. is a 501(c)(3) non-profit organization. Our mission is to be servant-leaders in our communities. We strive to inspire hope, empower breakthroughs, and alleviate barriers between mental and emotional wellness for vulnerable youth and young adults.',
  },
  {
    title: 'Our Mission',
    content:
      'By bridging the gap between crisis and stability, we advocate self-sufficiency and well-being while offering academic, and life skills development programs and resources.',
  },
  {
    title: 'What We Do',
    content:
      'Preventing homelessness and providing transitional planning to youth and adults in or formerly was in out-of-home placement (foster, adoptive, group and kinship care) ages 14-28 years old is our top priority.',
  },
  {
    title: 'Our Approach',
    content:
      'Storm Center of Hope & Service will stress discipline, confidence, modesty, and regard for others as the main guiding principle for our childhood. These fundamental beliefs will be reinforced by cooperation, commitment, and ingenuity.',
  },
  {
    title: 'Education Focus',
    content:
      'Education generally tends to focus on career opportunities, but education is so much more than that. In most cases, anyone who has an opportunity to acquire a good education will have a much better chance of succeeding in life.',
  },
  {
    title: 'Life Skills',
    content:
      "The World Health Organization views the following skills and abilities as essential: self-awareness, empathy, creative and critical thinking, decision making, problem-solving, effective communication, interpersonal skills, the ability to deal with one's emotions and the ability to cope with stress.",
  },
  {
    title: 'Collaboration',
    content:
      'We support and encourage collaboration, relationship building, and partnerships within our communities that in turn would help to identify ways in which we could cofunction effectively to advance common goals for our youth and young adults.',
  },
  {
    title: 'Contact',
    content:
      'Richardson, TX. Phone: 469-431-3582. Email: contact@stormcohs.org',
  },
]

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(content)

  useEffect(() => {
    const results = content.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm])

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl md:text-4xl font-bold mb-6 text-center text-blue-800'>
          STORM Center of Hope & Service
        </h1>

        <div className='max-w-2xl mx-auto mb-8'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Search for information...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          </div>
        </div>

        {searchResults.length === 0 ? (
          <div className='text-center p-8 bg-white rounded-lg shadow-md'>
            <Info className='w-16 h-16 mx-auto mb-4 text-blue-500' />
            <p className='text-xl text-gray-600'>
              No results found. Try a different search term.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {searchResults.map((item, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
              >
                <h2 className='text-xl font-semibold mb-2 text-blue-700'>
                  {item.title}
                </h2>
                <p className='text-gray-600'>{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
