import React from "react";

const SkeletonRow = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg shadow-sm w-full animate-pulse">
      {/* Image Placeholder */}
      <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>

      {/* Category Name Placeholder */}
      <div className="mt-6 md:mt-0 md:ml-4 w-3/4 md:w-1/3 h-6 bg-gray-300 rounded-md"></div>

      {/* Buttons Placeholder */}
      <div className="flex space-x-4 mt-4 md:mt-0 md:ml-auto">
        <div className="w-5 lg:w-20 h-5 lg:h-6 bg-gray-300 rounded-md"></div>
        <div className="w-5 lg:w-24 h-5 lg:h-6 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonRow;
