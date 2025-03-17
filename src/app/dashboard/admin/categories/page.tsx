"use client";

import CategoryTable from "@/components/dashboardAdmin/category/CategoryTable";
import { ToastContainer } from "react-toastify"; 
import { Suspense } from "react";

const AdminCategory = () => {
  return (
    <div className="flex min-h-screen flex-col">
    <ToastContainer />
      <main className="flex-grow p-6 shadow-md">       
        {/* CategoryTable */}
        <Suspense fallback={<div>Loading Product Cust...</div>}>
        <CategoryTable />
        </Suspense>
      </main>
    </div> 
  );
};

export default AdminCategory;