"use client";
import React from "react";

const FullSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col">
      <div className="bg-gray-300 h-48 md:h-56 w-full rounded-md" />
      <div className="mt-2 space-y-2">
        <div className="bg-gray-300 h-4 rounded w-3/4" />
        <div className="bg-gray-300 h-4 rounded w-1/2" />
      </div>
    </div>
  );
};

export default FullSkeleton;