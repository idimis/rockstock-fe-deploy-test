"use client";
import React from "react";

const FullSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-3 rounded-lg shadow-md flex flex-col border w-full h-full">
      <div className="bg-gray-300 w-full h-40 md:h-48 rounded-md" />
      
      <div className="mt-2 flex flex-col space-y-1 flex-grow">
        <div className="bg-gray-300 h-4 rounded w-1/3" />
        <div className="bg-gray-300 h-6 rounded w-3/4" />
        <div className="bg-gray-300 h-5 rounded w-1/2" />
        <div className="bg-gray-300 h-4 rounded w-1/4" />
      </div>
    </div>
  );
};

export default FullSkeleton;