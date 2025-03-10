"use client";

import React from "react";
import { IoTrashBin } from "react-icons/io5";

interface RemoveItemButtonProps {
  onClick: () => void;
}

const RemoveItemButton: React.FC<RemoveItemButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <IoTrashBin color="red" size={30} />
    </button>
  );
};

export default RemoveItemButton;