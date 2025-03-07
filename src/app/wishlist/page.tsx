"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Dark Gothic Candle Holder",
      price: 24.99,
      image: "/images/gothic-candle.jpg",
    },
    {
      id: 2,
      name: "Vintage Band Poster - Nirvana",
      price: 14.99,
      image: "/images/nirvana-poster.jpg",
    },
    {
      id: 3,
      name: "Black Velvet Coffin Couch",
      price: 599.99,
      image: "/images/coffin-couch.jpg",
    },
  ]);

  const handleAddToCart = (id: number) => {
    // Placeholder function
    alert(`Added item ${id} to cart!`);
  };

  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Wishlist</h1>
        <p className="text-black mb-6">Hey, Johnny Rotten! Here are your saved items.</p>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty. Start adding your favorite items!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg shadow-md bg-gray-100">
                <Image src={item.image} alt={item.name} width={150} height={150} className="rounded-lg" />
                <h3 className="text-lg font-semibold text-black mt-4">{item.name}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                
                <div className="mt-4 flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
