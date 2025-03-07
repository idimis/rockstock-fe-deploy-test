"use client";

import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Sidebar from "@/components/common/AdminSidebar";

const AdminOrders = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />

        {/* Content */}
        <main className="flex-grow p-6 bg-white shadow-md">
          <h1 className="text-xl font-bold mb-4">All Orders</h1>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">ORD-001</td>
                <td className="border p-2">John Doe</td>
                <td className="border p-2">$250.00</td>
                <td className="border p-2 text-yellow-600">Pending Payment</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
              <tr>
                <td className="border p-2">ORD-002</td>
                <td className="border p-2">Jane Smith</td>
                <td className="border p-2">$125.00</td>
                <td className="border p-2 text-green-600">Shipped</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
              <tr>
                <td className="border p-2">ORD-003</td>
                <td className="border p-2">Alice Brown</td>
                <td className="border p-2">$75.00</td>
                <td className="border p-2 text-red-600">Cancelled</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminOrders;
