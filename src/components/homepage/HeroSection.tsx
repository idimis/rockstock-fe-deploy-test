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
  { image: heroImage2, text: "Curated pieces for those who don't fit with Instagram aesthetic standard." },
  { image: heroImage3, text: "Craft your space with rock n' roll and untamed vibes." },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] md:h-[800px] flex flex-col md:flex-row items-center justify-center overflow-hidden text-black px-10 md:px-20 py-16">
      {/* Image Section */}
      <div className="relative w-full md:w-3/5 h-[500px] md:h-full">
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
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Text Section */}
      <div className="w-full md:w-2/5 flex flex-col items-start justify-center space-y-8 text-left mt-12 md:mt-0 md:ml-12">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {slides[currentIndex].text}
          </motion.h1>
        </AnimatePresence>
        
        <p className="text-lg md:text-xl text-black leading-relaxed">
          Dedicated for those who lived and breathed the music of the 90s-00s. Rock your home with style and nostalgia because punk, rock, and emo never die!
        </p>

        <div className="flex space-x-6 mt-6">
          <Link
            href="/products"
            className="px-6 py-3 border border-black text-black font-semibold rounded-md hover:bg-gray-200 transition"
          >
            Shop Our Collection
          </Link>
          <Link
            href="/sections/about"
            className="px-6 py-3 border border-black text-black font-semibold rounded-md hover:bg-gray-200 transition"
          >
            Learn More About Us
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full text-white hover:bg-white/40 transition"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </button>
      <button
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full text-white hover:bg-white/40 transition"
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'} transition`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
