"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Cart = () => {
  const router = useRouter();

  // Dummy cart items
  const cartItems = [
    {
      id: 1,
      name: "Vintage Skull Lamp",
      price: 49.99,
      quantity: 1,
      image: "/images/skull-lamp.jpg",
    },
    {
      id: 2,
      name: "Black Leather Armchair",
      price: 299.99,
      quantity: 1,
      image: "/images/leather-armchair.jpg",
    },
  ];

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-grow text-black container mx-auto p-6 mt-8 mb-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-300 pb-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <button className="px-3 py-1 bg-gray-200 text-black rounded-lg">-</button>
                  <span className="px-4 py-1 bg-gray-100 rounded-lg">{item.quantity}</span>
                  <button className="px-3 py-1 bg-gray-200 text-black rounded-lg">+</button>
                </div>
              </div>
              <button className="ml-4 text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="text-xl font-semibold">Total: $349.98</p>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            Checkout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
