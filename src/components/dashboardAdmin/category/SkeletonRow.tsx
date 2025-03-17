import React from "react";

const SkeletonRow = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between bg-gray-100 p-6 rounded-lg shadow-sm w-full animate-pulse">
      {/* Image Placeholder */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-300 rounded-lg"></div>

      {/* Category Name Placeholder */}
      <div className="mt-4 md:mt-0 md:ml-4 w-3/4 md:w-1/3 h-6 bg-gray-300 rounded-md"></div>

      {/* Buttons Placeholder */}
      <div className="flex space-x-4 md:space-x-8 mt-4 md:mt-0">
        <div className="w-16 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-16 h-6 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonRow;