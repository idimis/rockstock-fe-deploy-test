"use client";

import React from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useRouter } from "next/navigation";

const OrdersAdminPage = () => {
  const router = useRouter();

  const orders = [
    { id: "ORD123", user: "Johnny Rotten", total: 349.98, status: "Shipped" },
    { id: "ORD124", user: "Sid Vicious", total: 199.99, status: "Processing" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Orders</h1>
        <p className="text-black mb-6">Manage all customer orders.</p>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg shadow-md bg-gray-100">
              <p className="text-black font-semibold">Order ID: {order.id}</p>
              <p className="text-gray-700">User: {order.user}</p>
              <p className="text-gray-700">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-700">Status: {order.status}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                onClick={() => router.push(`/admin/orders/${order.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersAdminPage;
