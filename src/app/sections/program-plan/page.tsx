"use client";

import React, { useState } from "react";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import RockstockImage from "@/public/darkacademi.jpg";
import Navbar from '@/components/common/Navbar';
import Header from '@/components/common/Header'; 

const ProgramPlanning: React.FC = () => {
  const [isPlannerVisible, setIsPlannerVisible] = useState(false);

  const handleOpenPlanner = () => {
    setIsPlannerVisible(true);
  };

  return (
    <>
    <Header />
    <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-gray">
        <div className="relative w-full lg:w-1/2">
          <Image
            src={RockstockImage}
            alt="Rockstock Planning Program"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
            Rockstock Home Planning Program
          </h1>
          <p className="text-gray-600 mb-4 text-center">
            Become an interior designer with our easy-to-use program. Choose the perfect furniture for your space and experiment with different combinations to suit your style. You can view and print your best selections in all sizes, just like an architect.
          </p>
          <p className="text-gray-600 mb-4 text-center">
            When you’re satisfied with your plan, save it in the Rockstock Planner Tool and visit your nearest Rockstock store.
          </p>

          <div className="mb-6">
            <button
              onClick={handleOpenPlanner}
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 transition duration-300"
            >
              Start Planning Now
            </button>
          </div>

          {isPlannerVisible && (
            <div className="w-full max-w-3xl mx-auto mt-8">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Design Your Space
              </h2>
              <p className="text-gray-600 text-center mb-4">
                Use the Rockstock Home Planner to design kitchens, dining rooms, bedrooms, and workspaces in 2D or 3D format. See IKEA products in 3D and get a detailed list of your favorite items.
              </p>
              <div className="text-center">
                <button
                  className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  Save or Print Your Design
                </button>
              </div>
            </div>
          )}

          <p className="mt-8 text-gray-700 text-center">
            For security reasons, we cannot view information from personal media such as USB drives or CDs in Rockstock stores.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProgramPlanning;
