import React from "react";

const ProductFormSkeleton = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-3xl mx-auto animate-pulse">
      <div className="h-10 w-2/3 md:w-1/2 bg-gray-200 rounded mx-auto mb-6"></div>

      <form className="space-y-4">
        <div className="space-y-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-12 w-full bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-24 w-full bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-12 w-1/2 md:w-1/4 bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-12 w-1/2 md:w-1/4 bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-12 w-2/3 md:w-1/3 bg-gray-200 rounded"></div>
        </div>

        <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-2/3 md:w-full h-40 bg-gray-200 rounded"></div>
          <div className="w-2/3 md:w-full h-40 bg-gray-200 rounded"></div>
          <div className="w-2/3 md:w-full h-40 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="h-12 w-full md:w-44 bg-gray-200 rounded-md"></div>
          <div className="h-12 w-full md:w-24 bg-gray-200 rounded-md"></div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormSkeleton;