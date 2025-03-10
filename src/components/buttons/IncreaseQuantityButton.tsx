"use client";

import React from "react";

interface IncreaseQuantityButtonProps {
  onClick: () => void;
}

const IncreaseQuantityButton: React.FC<IncreaseQuantityButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="px-3 py-1 text-red-600 hover:bg-gray-200 rounded-full">
      +
    </button>
  );
};

export default IncreaseQuantityButton;