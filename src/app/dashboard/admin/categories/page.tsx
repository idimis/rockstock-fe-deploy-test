"use client";

import CategoryTable from "@/components/dashboardAdmin/category/CategoryTable";
import Sidebar from "@/components/common/AdminSidebar";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ToastContainer } from "react-toastify"; 
import { Suspense } from "react";

const AdminCategory = () => {
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
        
        <main className="flex-grow p-6 shadow-md overflow-hidden">
          {/* CategoryTable */}
          <Suspense fallback={<div>Loading Categories Management...</div>}>
          <CategoryTable />
          </Suspense>
        </main>
      </div> 
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminCategory;