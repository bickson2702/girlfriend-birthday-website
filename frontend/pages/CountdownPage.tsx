import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CountdownPageProps {
  onContinue: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownPage({ onContinue }: CountdownPageProps) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(currentYear, 7, 14); // August 14th (month is 0-indexed)
      
      // If birthday has passed this year, calculate for next year
      if (now > birthday) {
        birthday = new Date(currentYear + 1, 7, 14);
      }

      const difference = birthday.getTime() - now.getTime();

      if (difference <= 0) {
        setIsBirthday(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    onContinue();
    navigate('/birthday');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {Math.random() > 0.5 ? (
              <Heart className="text-pink-300 opacity-30" size={Math.random() * 20 + 15} />
            ) : (
              <Sparkles className="text-yellow-300 opacity-30" size={Math.random() * 20 + 15} />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Counting down to your special day...
        </h1>

        {!isBirthday ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-pink-200 text-sm md:text-lg font-medium uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <div className="text-6xl md:text-8xl font-bold text-white mb-4 animate-bounce" style={{ fontFamily: 'Dancing Script, cursive' }}>
              🎉 IT'S TIME! 🎉
            </div>
          </div>
        )}

        <p className="text-pink-200 text-lg md:text-xl mb-8 animate-fade-in" style={{ fontFamily: 'Poppins, sans-serif', animationDelay: '0.5s' }}>
          Every second brings us closer to celebrating you
        </p>

        <div className="flex flex-col gap-4 items-center">
          {(isBirthday || timeLeft.days === 0) && (
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-110 animate-fade-in"
              style={{ animationDelay: '1s' }}
            >
              It's Time! 🎂
            </Button>
          )}

          {/* Test button for development */}
          <Button
            onClick={handleContinue}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-xl text-sm transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '1.5s' }}
          >
            Skip to Celebration (Test) 🎉
          </Button>
        </div>
      </div>
    </div>
  );
}
