import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BirthdayMessagePageProps {
  onContinue: () => void;
}

export default function BirthdayMessagePage({ onContinue }: BirthdayMessagePageProps) {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

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
    
    // Show continue button after message animation
    setTimeout(() => setShowButton(true), 4000);
  }, []);

  const handleContinue = () => {
    onContinue();
    navigate('/message');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Floating Balloons */}
      <div className="absolute inset-0">
        {['🎈', '🎂', '🎉', '💖', '🌟'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random()}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        {showMessage && (
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 animate-bounce-in" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Happy Birthday,
            </h1>
            <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent mb-8 animate-slide-up" style={{ fontFamily: 'Dancing Script, cursive', animationDelay: '1s' }}>
              Beautiful! 💕
            </h2>
            <div className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in" style={{ fontFamily: 'Poppins, sans-serif', animationDelay: '2s' }}>
              Today is all about celebrating the most amazing person in my life
            </div>
          </div>
        )}

        {showButton && (
          <Button
            onClick={handleContinue}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl text-xl border-2 border-white/50 transition-all duration-300 transform hover:scale-110 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            There's More... 💝
          </Button>
        )}
      </div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
