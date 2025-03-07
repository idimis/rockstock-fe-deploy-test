"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  category: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      className="border rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition"
      onClick={handleCardClick}
    >
      <Image
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-lg font-semibold text-black mt-1">{product.price}</p>
    </div>
  );
};

export default ProductCard;
