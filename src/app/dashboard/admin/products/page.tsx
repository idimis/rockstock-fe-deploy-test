"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductTable from "@/components/dashboardAdmin/product/ProductTable";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminProduct = () => {
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
        <main className="flex-grow p-6 overflow-hidden">       
          {/* ProductTable */}
          <Suspense fallback={<div>Loading Products Management...</div>}>
            <ProductTable />
          </Suspense>
        </main>
    </div>
  );
};

export default AdminProduct;