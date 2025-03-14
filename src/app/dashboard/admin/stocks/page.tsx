"use client";

import Sidebar from "@/components/common/AdminSidebar";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StockTable from "@/components/dashboardAdmin/stock/StockTable";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminCategory = () => {
  const router = useRouter();

  useEffect(() => {
    const message = localStorage.getItem('toastMessage');
    if (message) {
      toast.success(message);
      localStorage.removeItem("toastMessage");
    }
  }, [router]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />

      {/* Header */}
      <Header />
      
      {/* Navbar */}
      <Navbar />
      
      <div className="flex flex-grow text-black">
        {/* Sidebar */}
        <Sidebar />
        
        <main className="flex-grow p-6 shadow-md">       
          {/* CategoryTable */}
          <Suspense fallback={<div>Loading Product Cust...</div>}>
            <StockTable />
          </Suspense>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminCategory;