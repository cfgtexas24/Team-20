import { useEffect, useState } from 'react';

// Define types for clothing and avatar
interface ClothingItem {
  id: number;
  name: string;
}

interface AvatarData {
  clothes: ClothingItem[];
}

interface User {
  id: number;
  avatar: AvatarData;
  purchases: ClothingItem[];
}

const Avatar: React.FC = () => {
  const [avatar, setAvatar] = useState<AvatarData | null>(null);
  const [purchasedClothes, setPurchasedClothes] = useState<ClothingItem[]>([]);

  useEffect(() => {
    // Fetch user avatar and purchased clothes
    fetch('/api/user')
      .then((res) => res.json())
      .then((data: User) => {
        setAvatar(data.avatar);
        setPurchasedClothes(data.purchases);
      });
  }, []);

  const handleWear = (clothingId: number) => {
    // Update the avatar with the selected clothing
    fetch('/api/sprite/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clothingId }),
    }).then(() => {
      // Optionally refetch avatar after updating clothes
      fetch('/api/user')
        .then((res) => res.json())
        .then((data: User) => setAvatar(data.avatar));
    });
  };

  return (
    <div>
      <h1>Your Avatar</h1>
      {avatar && avatar.clothes.length > 0 && (
        <img src={`/sprites/${avatar.clothes[0].name}.png`} alt="avatar" />
      )}
      <h2>Your Clothes</h2>
      <div className="clothes-list">
        {purchasedClothes.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <button onClick={() => handleWear(item.id)}>Wear</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avatar;
