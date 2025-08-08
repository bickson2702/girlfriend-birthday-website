import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface BirthdayMessagePageProps {
  onContinue: () => void;
}

export default function BirthdayMessagePage({ onContinue }: BirthdayMessagePageProps) {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Start confetti animation
    const confettiColors = ['#ff69b4', '#ff1493', '#ffd700', '#ff6347', '#9370db', '#00ced1'];
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }));
    setConfetti(newConfetti);

    // Show message after a short delay
    setTimeout(() => setShowMessage(true), 1000);
    
    // Play birthday audio when message shows
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Audio autoplay prevented:', error);
        });
      }
    }, 1500);
    
    // Show continue button after message animation
    setTimeout(() => setShowButton(true), 4000);
  }, []);

  const handleContinue = () => {
    // Fade out audio when continuing
    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.1;
        } else {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          clearInterval(fadeOut);
        }
      }, 100);
    }
    
    onContinue();
    navigate('/message');
  };

  // Create background squares
  const backgroundSquares = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        <source src="https://actions.google.com/sounds/v1/celebrations/birthday_party_horn.ogg" type="audio/ogg" />
        {/* Fallback to a simple birthday tune */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" />
      </audio>

      {/* Background Squares */}
      <div className="absolute inset-0">
        {backgroundSquares.map((square) => (
          <motion.div
            key={square.id}
            className="absolute border-2 border-white/30"
            style={{
              width: square.size,
              height: square.size,
              left: `${square.x}%`,
              top: `${square.y}%`,
              opacity: square.opacity,
            }}
            initial={{ rotate: 0, scale: 0 }}
            animate={{ 
              rotate: [0, square.rotation, square.rotation + 180],
              scale: [0, 1, 0.8, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Confetti Animation */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
          }}
          initial={{ y: -100, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: 720
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 3,
            ease: "easeIn"
          }}
        />
      ))}

      {/* Floating Balloons */}
      <div className="absolute inset-0">
        {['🎈', '🎂', '🎉', '💖', '🌟'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-4xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: [20, -10, 20],
              opacity: [0, 1, 1]
            }}
            transition={{
              duration: 4 + Math.random(),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full px-4">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 md:mb-8" 
                style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  duration: 1.5
                }}
              >
                Happy Birthday,
              </motion.h1>
              
              <motion.h2 
                className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent mb-6 md:mb-8" 
                style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  delay: 1,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
              >
                Linthoi! 💕
              </motion.h2>
              
              <motion.div 
                className="text-lg md:text-2xl lg:text-3xl text-white/90 mb-6 md:mb-8 px-4" 
                style={{ fontFamily: 'Playfair Display, serif' }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 2,
                  duration: 1,
                  ease: "easeOut"
                }}
              >
                Today is all about celebrating the most amazing person in my life
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <Button
                onClick={handleContinue}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl text-lg md:text-xl border-2 border-white/50 transition-all duration-300 transform hover:scale-110"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                There's More... 💝
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Audio control hint */}
      <motion.div
        className="absolute bottom-4 right-4 text-white/60 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        🎵 Birthday music playing
      </motion.div>
    </div>
  );
}
