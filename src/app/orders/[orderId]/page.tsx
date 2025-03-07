"use client";

import React from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useParams } from "next/navigation";

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const order = {
    id: orderId,
    date: "2024-08-20",
    total: 349.98,
    status: "Shipped",
    items: [
      { name: "Vintage Skull Lamp", price: 49.99, quantity: 1 },
      { name: "Black Leather Armchair", price: 299.99, quantity: 1 },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Order Details</h1>
        <p className="text-gray-700">Order ID: {order.id}</p>
        <p className="text-gray-700">Date: {order.date}</p>
        <p className="text-gray-700">Total: ${order.total.toFixed(2)}</p>
        <p className="text-gray-700">Status: {order.status}</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-black mb-2">Items</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)} (x{item.quantity})
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
