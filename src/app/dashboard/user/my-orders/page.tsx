// pages/dashboard/user/orders.js
"use client";

import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import UserSidebarPanel from "@/components/common/UserSidebar";
import Footer from "@/components/common/Footer";

const OrdersPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="flex text-black">
        <UserSidebarPanel />
        <main className="p-6 flex-1">
          <h1 className="text-2xl font-semibold">My Orders</h1>
          <p>View and manage your past orders here.</p>
          {/* TODO: Add order list component */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;