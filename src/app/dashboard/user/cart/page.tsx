"use client";

import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import UserSidebarPanel from "@/components/common/UserSidebar";
import Footer from "@/components/common/Footer";

const CartPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="flex text-black">
        <UserSidebarPanel />
        <main className="p-6 flex-1">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <p>Review your items before checkout.</p>
          {/* TODO: Add cart details component */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;