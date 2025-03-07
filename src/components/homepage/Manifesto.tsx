'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const textArray = [
  "/dark aesthetics/",
  "/industrial vibes/",
  "/gothic revival/",
  "/emo nostalgia/",
  "/alternative living/",
  "/vintage punk/",
  "/metalcore decor/",
  "/grunge influence/",
  "/baroque meets brutalist/",
  "/moody interiors/",
  "/rebellious comfort/",
  "/high-contrast spaces/",
  "/black and red harmony/",
  "/dramatic lighting/",
  "/underground aesthetics/",
  "/tattoo-inspired furniture/",
  "/haunted elegance/"
];

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textArray.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);
  
  const handleTextHover = () => {
    setIsTranslated(true);
  };

  return (
    <div className="relative flex flex-col justify-center items-center text-center overflow-hidden h-screen py-10 md:py-10">

      <motion.h1
        className="text-5xl md:text-8xl text-red-600 font-extrabold leading-tight mb-2 cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
        onHoverStart={handleTextHover} 
      >
        {isTranslated ? "TO LIVE" : "VIVERE"}
      </motion.h1>
      <motion.h1
        className="text-5xl md:text-8xl text-red-600 font-extrabold leading-tight mb-2 cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
        onHoverStart={handleTextHover} 
      >
        {isTranslated ? "IS TO DESIGN" : "EST CREARE"}
      </motion.h1>
      <motion.h1
        className="text-5xl md:text-8xl text-red-600 font-extrabold leading-tight mb-2 cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
        onHoverStart={handleTextHover} 
      >
        {isTranslated ? "AND TO REBEL" : "ET REBELLARE"}
      </motion.h1>

      <div className="flex flex-col relative z-10 text-center h-auto mt-5 md:mt-10">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentText}
            className="text-3xl md:text-5xl font-bold leading-relaxed font-serif"
            style={{ fontFamily: 'Poppins, sans-serif' }} 
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {textArray[currentText]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
}