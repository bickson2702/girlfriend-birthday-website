import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, Gift, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

  const [showButton, setShowButton] = useState(false);

  const revealWish = (id: number) => {
    setWishes(prev => {
      const updated = prev.map(wish => 
        wish.id === id ? { ...wish, revealed: true } : wish
      );
      
      // Check if cards 2, 3, 4 are revealed
      const targetCards = updated.filter(wish => [2, 3, 4].includes(wish.id));
      if (targetCards.every(wish => wish.revealed)) {
        setTimeout(() => setShowButton(true), 1000);
      }
      
      return updated;
    });
  };

  const handleContinue = () => {
    onContinue();
    navigate('/gallery');
  };

  const getRevealedCount = () => {
    const targetCards = wishes.filter(wish => [2, 3, 4].includes(wish.id));
    return targetCards.filter(wish => wish.revealed).length;
  };

  const getRemainingCount = () => {
    return 3 - getRevealedCount();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Star className="text-white" size={Math.random() * 15 + 10} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4" 
            style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.3
            }}
          >
            Birthday Wishes Collection
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-purple-200" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Click each card to reveal a special message 💝
          </motion.p>

          {/* Progress indicator */}
          <AnimatePresence>
            {!showButton && getRemainingCount() > 0 && (
              <motion.div
                className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1 }}
              >
                <p className="text-white/80 text-sm md:text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Reveal {getRemainingCount()} more cards (2, 3, 4) to continue ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !wish.revealed && revealWish(wish.id)}
            >
              <motion.div 
                className={`h-56 md:h-64 rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20 ${
                  wish.revealed 
                    ? 'bg-white/90 backdrop-blur-sm' 
                    : `bg-gradient-to-br ${wish.color} opacity-80 hover:opacity-100`
                } transition-all duration-500`}
                layout
              >
                <AnimatePresence mode="wait">
                  {!wish.revealed ? (
                    <motion.div 
                      className="flex flex-col items-center justify-center h-full text-white"
                      key="unrevealed"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="mb-4"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {wish.icon}
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-bold text-center mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {wish.title}
                      </h3>
                      <motion.p 
                        className="text-xs md:text-sm opacity-80"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Click to reveal
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="h-full flex flex-col"
                      key="revealed"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="mr-3">
                          {wish.icon}
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {wish.title}
                        </h3>
                      </div>
                      <motion.p 
                        className="text-gray-700 leading-relaxed flex-1 text-sm md:text-base" 
                        style={{ fontFamily: 'Playfair Display, serif' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {wish.content}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xl md:text-2xl text-white mb-4" style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}>
                  Now let's look at our beautiful memories together...
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl text-lg md:text-xl transition-all duration-300"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  View Our Photo Gallery 📸
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
