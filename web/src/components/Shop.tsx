import { useEffect, useState } from 'react';

// Define types for clothing items and user
interface ClothingItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // Add an imageUrl field to store the path to the image
}

interface User {
  id: number;
  points: number;
  purchases: ClothingItem[];
}

const Shop: React.FC = () => {
  const [clothes, setClothes] = useState<ClothingItem[]>([]); // Typed as ClothingItem array
  const [user, setUser] = useState<User | null>(null); // User can be null initially

  useEffect(() => {
    // Fetch clothing items from the backend
    fetch('/api/shop')
      .then((res) => res.json())
      .then((data: ClothingItem[]) => setClothes(data)); // Specify the expected data type

    // Fetch user data from the backend
    fetch('/api/user')
      .then((res) => res.json())
      .then((data: User) => setUser(data)); // Specify the expected data type
  }, []);

  const handlePurchase = (clothingId: number) => {
    fetch('/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clothingId }), // Send the clothing ID to the backend
    }).then(() => {
      // Optionally refetch user data after purchase
      fetch('/api/user')
        .then((res) => res.json())
        .then((data: User) => setUser(data));
    });
  };

  return (
    <div>
      <h1>Shop</h1>
      <p>Your Points: {user?.points}</p>
      <div className="shop-items">
        {clothes.map((item) => (
          <div key={item.id} className="shop-item">
            <img src={item.imageUrl} alt={item.name} width={100} height={100} /> {/* Display the image */}
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <button onClick={() => handlePurchase(item.id)}>Buy</button>
          </div>
        ))}
      </div>

      {/* Display avatar image */}
      <div className="avatar">
        <img src="/sprites/avatar.png" alt="Avatar" width={200} height={200} /> {/* Load avatar image */}
      </div>
    </div>
  );
};

export default Shop;
