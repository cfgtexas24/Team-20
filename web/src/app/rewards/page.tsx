'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Gift, CreditCard, Bus, Coffee, Smartphone } from 'lucide-react'

interface Reward {
  id: number
  name: string
  points: number
  icon: React.ReactNode
  description: string
}

const RewardCard: React.FC<{
  reward: Reward
  earnedPoints: number
  onRedeem: (id: number) => void
}> = ({ reward, earnedPoints, onRedeem }) => (
  <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
    <div className='flex items-center mb-4'>
      <div className='mr-4 text-blue-500'>{reward.icon}</div>
      <div>
        <h3 className='text-lg font-semibold'>{reward.name}</h3>
        <p className='text-gray-600 text-sm'>{reward.points} points</p>
      </div>
    </div>
    <p className='text-gray-600 mb-4 text-sm'>{reward.description}</p>
    <Button
      onClick={() => onRedeem(reward.id)}
      disabled={earnedPoints < reward.points}
      variant={earnedPoints >= reward.points ? 'default' : 'secondary'}
      className='w-full'
    >
      {earnedPoints >= reward.points
        ? 'Redeem'
        : `Need ${reward.points - earnedPoints} more points`}
    </Button>
  </div>
)

const Rewards: React.FC = () => {
  const [earnedPoints, setEarnedPoints] = useState<number>(1250)
  const [rewards] = useState<Reward[]>([
    {
      id: 1,
      name: 'Gift Card',
      points: 500,
      icon: <Gift className='w-6 h-6' />,
      description: 'Redeem for a $10 gift card to popular retailers.',
    },
    {
      id: 2,
      name: 'Transport Voucher',
      points: 750,
      icon: <Bus className='w-6 h-6' />,
      description:
        'Get a voucher for public transportation or ride-sharing services.',
    },
    {
      id: 3,
      name: 'Free Meal',
      points: 1000,
      icon: <Coffee className='w-6 h-6' />,
      description: 'Enjoy a free meal at participating local restaurants.',
    },
    {
      id: 4,
      name: 'Phone Credit',
      points: 2000,
      icon: <Smartphone className='w-6 h-6' />,
      description: 'Receive credit for your mobile phone or data plan.',
    },
  ])

  const handleRedeem = (id: number) => {
    const reward = rewards.find((r) => r.id === id)
    if (reward && earnedPoints >= reward.points) {
      setEarnedPoints((prev) => prev - reward.points)
      alert(`You've successfully redeemed ${reward.name}!`)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left'>
        Your Rewards
      </h1>

      <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-8 text-white'>
        <h2 className='text-xl font-semibold mb-2'>Earned Points</h2>
        <p className='text-4xl font-bold'>{earnedPoints}</p>
        <p className='mt-2 text-sm'>
          Keep earning points to unlock more rewards!
        </p>
      </div>

      <h2 className='text-2xl font-semibold mb-6'>Available Rewards</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            earnedPoints={earnedPoints}
            onRedeem={handleRedeem}
          />
        ))}
      </div>

      <div className='mt-12 bg-gray-100 p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4'>How to Earn More Points</h2>
        <ul className='list-disc list-inside space-y-2 text-gray-700'>
          <li>Complete your profile information</li>
          <li>Attend community events</li>
          <li>Participate in surveys and feedback sessions</li>
          <li>Refer other veterans to our program</li>
          <li>Engage with educational content</li>
        </ul>
      </div>
    </div>
  )
}

export default Rewards
