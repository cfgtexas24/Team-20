'use client'
import React, { useState } from 'react';

interface Reward {
  id: number;
  name: string;
  points: number;
}

const Rewards: React.FC = () => {
  const [earnedPoints] = useState<number>(1250);
  const [rewards] = useState<Reward[]>([
    { id: 1, name: "Giftcard", points: 500 },
    { id: 2, name: "Transportation voucher", points: 750 },
    { id: 3, name: "Free meal", points: 1000 },
    { id: 4, name: "Phone/Data credigit", points: 2000 },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Rewards</h1>
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Earned Points</h2>
        <p className="text-4xl font-bold text-blue-600">{earnedPoints}</p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
            <p className="text-gray-600">{reward.points} points</p>
            <button
              className={`mt-4 px-4 py-2 rounded-full ${
                earnedPoints >= reward.points
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={earnedPoints < reward.points}
            >
              {earnedPoints >= reward.points ? 'Redeem' : 'Not enough points'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;