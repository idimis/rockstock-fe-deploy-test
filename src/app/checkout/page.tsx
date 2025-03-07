"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

const CheckoutPage = () => {
  const router = useRouter();

  const handleProceedToPayment = () => {
    router.push("/checkout/payment");
  };

  // Dummy order details
  const customerName = "Johnny Rotten";
  const shippingAddress = "666 Underground Street, Dark Alley, NY 10101";
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

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Checkout</h1>
        <p className="text-black mb-6">Hey, <span className="font-semibold">{customerName}</span>! Review your order before proceeding to payment.</p>

        {/* Order Summary */}
        <div className="p-6 rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
          
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-300 pb-4 mb-4">
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="mt-4 text-black">
            <p><span className="font-semibold">Shipping Address:</span> {shippingAddress}</p>
          </div>

          <div className="mt-4 text-xl font-semibold text-black">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Proceed to Payment Button */}
        <button
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 w-full md:w-auto"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
