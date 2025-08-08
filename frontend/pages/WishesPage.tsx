import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, Gift, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WishesPageProps {
  onContinue: () => void;
}

interface WishCard {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
  revealed: boolean;
}

export default function WishesPage({ onContinue }: WishesPageProps) {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState<WishCard[]>([
    {
      id: 1,
      title: "My Wish for You",
      content: "May this new year of your life be filled with endless joy, laughter, and all the dreams your heart desires. You deserve nothing but the absolute best! ✨",
      icon: <Star className="text-yellow-400" size={32} />,
      color: "from-yellow-400 to-orange-500",
      revealed: false,
    },
    {
      id: 2,
      title: "Our Future Together",
      content: "I can't wait to celebrate many more birthdays with you, create countless more memories, and grow old together while still feeling young at heart. 💕",
      icon: <Heart className="text-pink-400" size={32} />,
      color: "from-pink-400 to-rose-500",
      revealed: false,
    },
    {
      id: 3,
      title: "What Makes You Special",
      content: "Your kindness lights up every room, your smile makes my day brighter, and your love makes me a better person. You're absolutely incredible! 🌟",
      icon: <Sparkles className="text-purple-400" size={32} />,
      color: "from-purple-400 to-indigo-500",
      revealed: false,
    },
    {
      id: 4,
      title: "Adventures Ahead",
      content: "Here's to more spontaneous road trips, cozy movie nights, trying new restaurants, and making every ordinary day feel like an adventure together! 🎈",
      icon: <Gift className="text-green-400" size={32} />,
      color: "from-green-400 to-teal-500",
      revealed: false,
    },
    {
      id: 5,
      title: "Favorite Memories",
      content: "Remember our first date? The way you laughed at my terrible jokes? Every moment with you becomes a treasured memory that I carry in my heart. 📸",
      icon: <Camera className="text-blue-400" size={32} />,
      color: "from-blue-400 to-cyan-500",
      revealed: false,
    },
    {
      id: 6,
      title: "You Are Loved",
      content: "Never forget how deeply you are loved, how much you mean to me, and how grateful I am every day that you chose to share your life with me. Happy Birthday! 💖",
      icon: <Heart className="text-red-400" size={32} />,
      color: "from-red-400 to-pink-500",
      revealed: false,
    },
  ]);

  const [allRevealed, setAllRevealed] = useState(false);

  const revealWish = (id: number) => {
    setWishes(prev => {
      const updated = prev.map(wish => 
        wish.id === id ? { ...wish, revealed: true } : wish
      );
      
      // Check if all wishes are revealed
      if (updated.every(wish => wish.revealed)) {
        setTimeout(() => setAllRevealed(true), 1000);
      }
      
      return updated;
    });
  };

  const handleContinue = () => {
    onContinue();
    navigate('/gallery');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star className="text-white opacity-20" size={Math.random() * 15 + 10} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Birthday Wishes Collection
          </h1>
          <p className="text-xl text-purple-200 animate-fade-in" style={{ fontFamily: 'Poppins, sans-serif', animationDelay: '0.5s' }}>
            Click each card to reveal a special message 💝
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {wishes.map((wish, index) => (
            <div
              key={wish.id}
              className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => !wish.revealed && revealWish(wish.id)}
            >
              <div className={`h-64 rounded-2xl p-6 shadow-2xl border border-white/20 ${
                wish.revealed 
                  ? 'bg-white/90 backdrop-blur-sm' 
                  : `bg-gradient-to-br ${wish.color} opacity-80 hover:opacity-100`
              } transition-all duration-500`}>
                
                {!wish.revealed ? (
                  <div className="flex flex-col items-center justify-center h-full text-white">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {wish.icon}
                    </div>
                    <h3 className="text-xl font-bold text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {wish.title}
                    </h3>
                    <p className="text-sm mt-2 opacity-80">Click to reveal</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col animate-fade-in">
                    <div className="flex items-center mb-4">
                      <div className="mr-3">
                        {wish.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {wish.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {wish.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {allRevealed && (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Now let's look at our beautiful memories together...
              </p>
            </div>
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-110"
            >
              View Our Photo Gallery 📸
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
