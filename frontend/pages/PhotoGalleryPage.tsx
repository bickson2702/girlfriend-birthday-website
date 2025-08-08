import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: number;
  url: string;
  caption: string;
  date: string;
}

export default function PhotoGalleryPage() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Sample photos - replace with actual photo URLs
  const photos: Photo[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
      caption: "Our first photo together - the beginning of our beautiful story 💕",
      date: "March 16, 2025"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop",
      caption: "That perfect sunset dinner where you stole my heart completely 🌅",
      date: "April 2025"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop",
      caption: "Dancing in the kitchen like nobody's watching - pure happiness ✨",
      date: "May 2025"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      caption: "Our adventure to the mountains - you make every view more beautiful 🏔️",
      date: "June 2025"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      caption: "Beach day bliss - your smile brighter than the sunshine ☀️",
      date: "July 2025"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      caption: "Cozy moments together - my favorite place is wherever you are 🏡",
      date: "August 2025"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPhoto((prev) => (prev + 1) % photos.length);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, photos.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentPhoto]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
    setShowControls(true);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    setShowControls(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const photoVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Heart
              className="text-pink-500"
              size={Math.random() * 30 + 20}
            />
          </motion.div>
        ))}
      </div>

      {/* Main photo display */}
      <div className="relative h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          {/* Photo container */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence initial={false} custom={1}>
              <motion.div
                key={currentPhoto}
                custom={1}
                variants={photoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.6 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextPhoto();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevPhoto();
                  }
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={photos[currentPhoto].url}
                  alt={photos[currentPhoto].caption}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Photo caption */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.p 
                    className="text-lg md:text-xl lg:text-2xl font-medium mb-2" 
                    style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {photos[currentPhoto].caption}
                  </motion.p>
                  <motion.p 
                    className="text-sm md:text-base opacity-80" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {photos[currentPhoto].date}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <AnimatePresence>
              {showControls && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-between p-2 md:p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={prevPhoto}
                      variant="ghost"
                      size="icon"
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm"
                    >
                      <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={nextPhoto}
                      variant="ghost"
                      size="icon"
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm"
                    >
                      <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Top controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex justify-between items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}>
                Our Beautiful Memories
              </h1>
              <p className="text-xs md:text-sm opacity-80" style={{ fontFamily: 'Playfair Display, serif' }}>
                {currentPhoto + 1} of {photos.length}
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  onClick={togglePlayPause}
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm"
                >
                  {isPlaying ? <Pause size={16} className="md:w-5 md:h-5" /> : <Play size={16} className="md:w-5 md:h-5" />}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm"
                >
                  <Download size={16} className="md:w-5 md:h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom photo thumbnails */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-1 md:gap-2 justify-center overflow-x-auto pb-2 scrollbar-hide">
              {photos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  onClick={() => {
                    setCurrentPhoto(index);
                    setShowControls(true);
                  }}
                  className={`flex-shrink-0 w-12 h-9 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentPhoto 
                      ? 'border-pink-400 scale-110' 
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  whileHover={{ scale: index === currentPhoto ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final message */}
      <motion.div 
        className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.p 
          className="text-base md:text-lg lg:text-xl mb-2" 
          style={{ fontFamily: 'Great Vibes, Dancing Script, cursive' }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Now let's go celebrate in person! 🎉
        </motion.p>
        <p className="text-sm md:text-base opacity-80" style={{ fontFamily: 'Playfair Display, serif' }}>
          Happy Birthday, my love! 💕
        </p>
      </motion.div>

      {/* Click anywhere to show controls */}
      <div 
        className="absolute inset-0 cursor-pointer z-0"
        onClick={() => setShowControls(true)}
      />
    </div>
  );
}
