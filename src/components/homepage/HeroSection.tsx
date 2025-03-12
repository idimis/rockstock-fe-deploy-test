import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage1 from '@/public/hero1.webp';
import heroImage2 from '@/public/hero2.jpg';
import heroImage3 from '@/public/hero3.webp';
import Link from 'next/link';

const slides = [
  { image: heroImage1, text: "Find your rockstar aesthetic furniture." },
  { image: heroImage2, text: "Curated pieces for those who don't fit with instagram aesthetic standard." },
  { image: heroImage3, text: "Craft Your Space with Rock n' Roll, Raw, Untamed Vibes." },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Image
              src={slides[currentIndex].image}
              alt="Hero Image"
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 w-full flex flex-col items-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            className="text-4xl md:text-4xl font-bold text-black drop-shadow-lg bg-white/90 px-6 py-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {slides[currentIndex].text}
          </motion.h1>
        </AnimatePresence>

        <p className="mt-4 text-lg md:text-xl text-black bg-white/80 px-4 py-2 rounded-lg">
          Dedicated for those who lived and breathed the music of the 90s-00s.<br />
          Rock your home with style and nostalgia because punk, rock, and emo never dies!
        </p>


        <div className="flex space-x-4 mt-6">
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Shop Our Collection
          </Link>
          <Link
            href="/sections/about"
            className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Learn More About Us
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-3 rounded-full text-black hover:bg-white transition"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-3 rounded-full text-black hover:bg-white transition"
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-400'} transition`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
