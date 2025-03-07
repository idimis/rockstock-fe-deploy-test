"use client";

import React from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useParams } from "next/navigation";

const AdminOrderDetailPage = () => {
  const { orderId } = useParams();

  // Dummy data untuk pesanan
  const order = {
    id: orderId,
    user: "Johnny Rotten",
    email: "johnny@example.com",
    date: "2024-08-20",
    total: 349.98,
    status: "Shipped",
    shippingAddress: "123 Punk Street, London, UK",
    paymentMethod: "Credit Card (Visa)",
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
        <h1 className="text-3xl font-bold mb-4 text-black">Order Details (Admin)</h1>
        <p className="text-gray-700">Order ID: <span className="font-semibold">{order.id}</span></p>
        <p className="text-gray-700">Customer: <span className="font-semibold">{order.user}</span></p>
        <p className="text-gray-700">Email: <span className="font-semibold">{order.email}</span></p>
        <p className="text-gray-700">Date: <span className="font-semibold">{order.date}</span></p>
        <p className="text-gray-700">Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
        <p className="text-gray-700">Status: <span className="font-semibold">{order.status}</span></p>
        <p className="text-gray-700">Shipping Address: <span className="font-semibold">{order.shippingAddress}</span></p>
        <p className="text-gray-700">Payment Method: <span className="font-semibold">{order.paymentMethod}</span></p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-black mb-2">Order Items</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)} (x{item.quantity})
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
            Mark as Delivered
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
            Cancel Order
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrderDetailPage;
