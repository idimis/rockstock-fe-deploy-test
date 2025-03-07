"use client";

import React, { useState } from "react";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import freeDesignImage from "@/public/darkfurniture.jpeg"; 
import Navbar from '@/components/common/Navbar';
import Header from '@/components/common/Header'; 

const FreeDesignPage: React.FC = () => {
  const [isDesigning, setIsDesigning] = useState(false);

  const handleStartDesign = () => {
    setIsDesigning(true);
  };

  return (
    <>
    <Header />
    <Navbar />
      <div className="flex flex-col min-h-screen bg-light-gray">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Free Design Tool</h1>
          <p className="text-gray-600 mb-6">
            Use our free design tool to create the perfect room layout with IKEA products.
            Choose from a variety of furniture options and arrange them in 3D to suit your space.
          </p>
        </div>

        <div className="flex justify-center p-8">
          {/* 3D Design Tool / Template */}
          <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <Image
              src={freeDesignImage}
              alt="3D Design Template"
              width={800}
              height={600}
              className="rounded-lg"
            />
            <div className="text-center mt-6">
              <button
                onClick={handleStartDesign}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 transition duration-300"
              >
                Start Designing
              </button>
            </div>
          </div>
        </div>

        {isDesigning && (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-600">Design Your Room</h2>
            <p className="text-gray-600">
              Choose your furniture items, place them in your room, and visualize how they fit
              into your space. Play with different configurations and find the perfect layout.
            </p>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default FreeDesignPage;
