"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '@/public/animation2.json';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cek jika halaman sudah pernah diload sebelumnya
    const isLoadedBefore = sessionStorage.getItem('isLoadedBefore');
    if (isLoadedBefore) {
      window.location.replace('/'); // Arahkan langsung ke halaman beranda jika sudah pernah dimuat
      return;
    }

    const timer = setTimeout(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Setelah loading selesai, set flag di sessionStorage dan arahkan ke beranda
          sessionStorage.setItem('isLoadedBefore', 'true');
          window.location.replace('/'); // Ganti ke halaman beranda
          return prev;
        }
        return prev + 10;
      });
    }, 275); // Timer interval 275ms

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-white text-black">
      <div className="relative w-full h-full flex items-center justify-center flex-col">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: '80%', height: 'auto', maxWidth: '500px' }}
        />
        <div className="text-2xl font-bold mt-2 sm:text-3xl md:text-4xl">{`Loading ${progress}%`}</div>

        <div className="text-lg mt-2 sm:text-xl md:text-2xl">
          <AnimatedDots />
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-base sm:text-lg md:text-xl">Your Rockstock experience is almost ready!</p>
      </div>
    </div>
  );
};

const AnimatedDots = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="text-base sm:text-lg md:text-xl">Please wait{dots}</div>
      <div className="text-base sm:text-lg md:text-xl">We’re tuning the stage for your Rockstock vibe! 🎸</div>
    </div>
  );
};

export default React.memo(LoadingScreen);
