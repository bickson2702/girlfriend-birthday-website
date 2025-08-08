import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalMessagePageProps {
  onContinue: () => void;
}

export default function PersonalMessagePage({ onContinue }: PersonalMessagePageProps) {
  const navigate = useNavigate();
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [displayedText, setDisplayedText] = useState<string[]>([]);

  const message = [
    "From the moment we started dating on March 16th, 2025, my life has been filled with colors I never knew existed. You brought sunshine into my darkest days and made every ordinary moment feel extraordinary.",
    "Your laugh is my favorite sound, your smile is my daily motivation, and your love is my greatest treasure. You have this incredible way of making everything better just by being yourself.",
    "I love how you dance when you think no one is watching, how you get excited about the little things, and how you make me feel like the luckiest person alive every single day.",
    "You make every day feel like a celebration, but today is special because it's all about celebrating YOU - the most beautiful, kind, and amazing person I've ever known.",
    "Happy Birthday, my love. Here's to many more years of adventures, laughter, and endless love together. You deserve all the happiness in the world, and I'm so grateful to be part of your story. 💕"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentParagraph((prev) => {
        if (prev < message.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => setShowButton(true), 1000);
          clearInterval(timer);
          return prev;
        }
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for each paragraph
  useEffect(() => {
    if (currentParagraph >= 0) {
      const currentText = message[currentParagraph];
      let charIndex = 0;
      const newDisplayedText = [...displayedText];
      
      if (!newDisplayedText[currentParagraph]) {
        newDisplayedText[currentParagraph] = '';
      }

      const typeWriter = setInterval(() => {
        if (charIndex < currentText.length) {
          newDisplayedText[currentParagraph] = currentText.slice(0, charIndex + 1);
          setDisplayedText([...newDisplayedText]);
          charIndex++;
        } else {
          clearInterval(typeWriter);
        }
      }, 30); // Adjust speed here (lower = faster)

      return () => clearInterval(typeWriter);
    }
  }, [currentParagraph]);

  const handleContinue = () => {
    onContinue();
    navigate('/wishes');
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1, 0.5],
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart
              className="text-pink-200"
              size={Math.random() * 40 + 20}
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl border border-pink-200"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6" 
            style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A Message From My Heart
          </motion.h1>
        </div>

        <motion.div 
          className="space-y-6 md:space-y-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedText.map((text, index) => (
            <motion.div
              key={index}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="inline-block">
                {text}
                {index === currentParagraph && text.length < message[index].length && (
                  <motion.span
                    className="inline-block w-0.5 h-6 bg-pink-500 ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {showButton && (
            <motion.div 
              className="text-center mt-8 md:mt-12"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-110"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Continue the Journey 💖
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        {[
          { position: 'top-4 left-4', color: 'text-pink-300' },
          { position: 'top-4 right-4', color: 'text-purple-300' },
          { position: 'bottom-4 left-4', color: 'text-purple-300' },
          { position: 'bottom-4 right-4', color: 'text-pink-300' }
        ].map((item, index) => (
          <motion.div 
            key={index}
            className={`absolute ${item.position} ${item.color} opacity-50`}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          >
            <Heart size={24} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
