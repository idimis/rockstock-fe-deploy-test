"use client";

import { ToastContainer } from "react-toastify";
import StockTable from "@/components/dashboardAdmin/stock/StockTable";
import { Suspense } from "react";

const AdminStock = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />
          <main className="flex-grow p-6 overflow-hidden">
          {/* Stock Table */}
          <Suspense fallback={<div>Loading Stocks Management...</div>}>
            <StockTable />
          </Suspense>
        </main>
      </div>

  );
};

export default AdminStock;