import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-500 opacity-10 animate-float"
            size={Math.random() * 30 + 20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main photo display */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="relative max-w-4xl w-full mx-4">
          {/* Photo container with heart-shaped reveal animation */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={photos[currentPhoto].url}
              alt={photos[currentPhoto].caption}
              className="w-full h-full object-cover animate-fade-in"
              key={currentPhoto}
            />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Photo caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xl md:text-2xl font-medium mb-2 animate-slide-up" style={{ fontFamily: 'Dancing Script, cursive' }}>
                {photos[currentPhoto].caption}
              </p>
              <p className="text-sm md:text-base opacity-80 animate-slide-up" style={{ fontFamily: 'Poppins, sans-serif', animationDelay: '0.2s' }}>
                {photos[currentPhoto].date}
              </p>
            </div>
          </div>

          {/* Navigation controls */}
          <div className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              onClick={prevPhoto}
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button
              onClick={nextPhoto}
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Top controls */}
      <div className={`absolute top-6 left-6 right-6 flex justify-between items-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-white">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Our Beautiful Memories
          </h1>
          <p className="text-sm opacity-80" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {currentPhoto + 1} of {photos.length}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={togglePlayPause}
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
          >
            <Download size={20} />
          </Button>
        </div>
      </div>

      {/* Bottom photo thumbnails */}
      <div className={`absolute bottom-6 left-6 right-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => {
                setCurrentPhoto(index);
                setShowControls(true);
              }}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentPhoto 
                  ? 'border-pink-400 scale-110' 
                  : 'border-white/30 hover:border-white/60'
              }`}
            >
              <img
                src={photo.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Final message */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white animate-fade-in" style={{ animationDelay: '2s' }}>
        <p className="text-lg md:text-xl mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Now let's go celebrate in person! 🎉
        </p>
        <p className="text-sm opacity-80" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Happy Birthday, my love! 💕
        </p>
      </div>

      {/* Click anywhere to show controls */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={() => setShowControls(true)}
      />
    </div>
  );
}
