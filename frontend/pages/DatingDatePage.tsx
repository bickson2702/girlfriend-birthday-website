import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DatingDatePageProps {
  onCorrectAnswer: () => void;
  hasAnswered: boolean;
}

export default function DatingDatePage({ onCorrectAnswer, hasAnswered }: DatingDatePageProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const correctDate = '2025-03-16';

  const handleSubmit = () => {
    if (selectedDate === correctDate) {
      setShowSuccess(true);
      setTimeout(() => {
        onCorrectAnswer();
        navigate('/countdown');
      }, 2000);
    } else {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  if (hasAnswered) {
    navigate('/countdown');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20 animate-pulse"
            size={Math.random() * 30 + 20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
            <Calendar className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Before we begin this special journey...
          </h1>
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Do you remember the official date we started dating?
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-center text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedDate}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Let's Continue 💕
          </Button>

          {showHint && (
            <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200 animate-fade-in">
              <p className="text-pink-600 font-medium">
                Think about that beautiful spring day when everything changed... 🌸
              </p>
            </div>
          )}

          {showSuccess && (
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
              <p className="text-green-600 font-medium text-lg">
                Yes! That's when my world changed forever 💕
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
