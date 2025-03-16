"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/common/AdminSidebar";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const AdminDashboard = () => {
  const [fullname, setFullname] = useState<string | null>(null);

  useEffect(() => {
    // Mengambil fullname yang disimpan
    const storedFullname = localStorage.getItem("fullname");
    setFullname(storedFullname || "Admin");

    
    const jwtToken = localStorage.getItem("jwt_token");

    if (jwtToken) {
      console.log("JWT Token is available:", jwtToken);
    } else {
      console.log("JWT Token is not available.");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-4">👋 Welcome, {fullname}!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sales Summary */}
            <div className="p-4 bg-blue-100 shadow rounded-lg">
              <h2 className="text-lg font-semibold">💰 Total Sales</h2>
              <p className="text-2xl font-bold">$25,230</p>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
            
            {/* Orders Summary */}
            <div className="p-4 bg-green-100 shadow rounded-lg">
              <h2 className="text-lg font-semibold">📦 Total Orders</h2>
              <p className="text-2xl font-bold">1,340</p>
              <p className="text-sm text-gray-600">Pending: 120 | Completed: 1,100</p>
            </div>

            {/* Customers */}
            <div className="p-4 bg-yellow-100 shadow rounded-lg">
              <h2 className="text-lg font-semibold">👥 New Customers</h2>
              <p className="text-2xl font-bold">320</p>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">📈 Sales Performance</h2>
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-600">Chart Placeholder</div>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">🔥 Best Selling Products</h2>
              <ul className="mt-2 space-y-2">
                <li>1. Product A - 500 sold</li>
                <li>2. Product B - 450 sold</li>
                <li>3. Product C - 400 sold</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
