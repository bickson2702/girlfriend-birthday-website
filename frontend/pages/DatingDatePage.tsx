import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface DatingDatePageProps {
  onCorrectAnswer: () => void;
  hasAnswered: boolean;
}

export default function DatingDatePage({ onCorrectAnswer, hasAnswered }: DatingDatePageProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const correctDate = '2025-03-16';

  const handleSubmit = () => {
    if (selectedDate === correctDate) {
      setShowSuccess(true);
      setIsLoading(true);
      setTimeout(() => {
        onCorrectAnswer();
        navigate('/countdown');
      }, 3000);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart
              className="text-pink-300"
              size={Math.random() * 30 + 20}
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-pink-200"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Calendar className="text-white" size={32} />
          </motion.div>
          
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4" 
            style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Before we begin this magical journey...
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-base md:text-lg" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Do you remember the official date we started dating?
          </motion.p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-center text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl p-4 bg-gradient-to-r from-pink-50 to-purple-50 focus:outline-none transition-all duration-300"
                style={{ fontFamily: 'Playfair Display, serif' }}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-200/20 to-purple-200/20 pointer-events-none"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button
              onClick={handleSubmit}
              disabled={!selectedDate || isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                  Creating Magic...
                </div>
              ) : (
                "Let's Continue 💕"
              )}
            </Button>
          </motion.div>

          <AnimatePresence>
            {showHint && (
              <motion.div 
                className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-pink-600 font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Think about that beautiful spring day when everything changed... 🌸
                </p>
              </motion.div>
            )}

            {showSuccess && (
              <motion.div 
                className="text-center p-4 bg-green-50 rounded-xl border border-green-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <p className="text-green-600 font-medium text-lg" style={{ fontFamily: 'Great Vibes, cursive' }}>
                    Yes! That's when my world changed forever 💕
                  </p>
                </motion.div>
                
                {isLoading && (
                  <motion.div 
                    className="mt-4 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-pink-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
