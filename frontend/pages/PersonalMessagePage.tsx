import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersonalMessagePageProps {
  onContinue: () => void;
}

export default function PersonalMessagePage({ onContinue }: PersonalMessagePageProps) {
  const navigate = useNavigate();
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showButton, setShowButton] = useState(false);

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
          setShowButton(true);
          clearInterval(timer);
          return prev;
        }
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    onContinue();
    navigate('/wishes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 opacity-30 animate-float"
            size={Math.random() * 40 + 20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
            A Message From My Heart
          </h1>
        </div>

        <div className="space-y-8 text-center">
          {message.slice(0, currentParagraph + 1).map((paragraph, index) => (
            <p
              key={index}
              className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in"
              style={{ 
                fontFamily: 'Poppins, sans-serif',
                animationDelay: `${index * 0.5}s`
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {showButton && (
          <div className="text-center mt-12">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-110 animate-fade-in"
              style={{ animationDelay: '1s' }}
            >
              Continue the Journey 💖
            </Button>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-pink-300 opacity-50">
          <Heart size={24} />
        </div>
        <div className="absolute top-4 right-4 text-purple-300 opacity-50">
          <Heart size={24} />
        </div>
        <div className="absolute bottom-4 left-4 text-purple-300 opacity-50">
          <Heart size={24} />
        </div>
        <div className="absolute bottom-4 right-4 text-pink-300 opacity-50">
          <Heart size={24} />
        </div>
      </div>
    </div>
  );
}
