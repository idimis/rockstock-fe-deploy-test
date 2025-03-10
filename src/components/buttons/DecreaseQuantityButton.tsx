"use client";

import React from "react";

interface DecreaseQuantityButtonProps {
  onClick: () => void;
}

const DecreaseQuantityButton: React.FC<DecreaseQuantityButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-red-600 hover:bg-gray-200 rounded-full"
    >
      -
    </button>
  );
};

export default DecreaseQuantityButton;