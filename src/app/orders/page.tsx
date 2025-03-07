"use client";

import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router = useRouter();

  const orders = [
    { id: "ORD123", date: "2024-08-20", total: 349.98, status: "Shipped" },
    { id: "ORD124", date: "2024-08-18", total: 199.99, status: "Processing" },
    { id: "ORD125", date: "2024-08-15", total: 89.99, status: "Delivered" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Your Orders</h1>
        <p className="text-black mb-6">Track your past and current orders.</p>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-lg shadow-md bg-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-black">Order ID: {order.id}</h3>
                <p className="text-gray-700">Date: {order.date}</p>
                <p className="text-gray-700">Total: ${order.total.toFixed(2)}</p>
                <p className="text-gray-700">Status: {order.status}</p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                onClick={() => router.push(`/orders/${order.id}`)}
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

export default OrdersPage;
