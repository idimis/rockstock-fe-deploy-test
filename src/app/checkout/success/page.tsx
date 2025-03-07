"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const SuccessPage = () => {
  const router = useRouter();
  const orderId = "ROCK123456"; // Dummy order ID

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Order Confirmed! 🎸</h1>
        <p className="text-black mb-6">Johnny Rotten, your order has been successfully placed.</p>
        <p className="text-lg text-black">Order ID: <span className="font-bold">{orderId}</span></p>

        <button className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 mr-4" onClick={() => router.push("/")}>
          Back to Home
        </button>
        <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600" onClick={() => router.push("/orders")}>
          View Orders
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;
