"use client";

import React from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const PaymentsAdminPage = () => {
  const payments = [
    { id: "PAY001", user: "Johnny Rotten", amount: 349.98, status: "Completed" },
    { id: "PAY002", user: "Sid Vicious", amount: 199.99, status: "Pending" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Payments</h1>
        <p className="text-black mb-6">Manage user transactions.</p>

        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 border rounded-lg shadow-md bg-gray-100">
              <p className="text-black font-semibold">Payment ID: {payment.id}</p>
              <p className="text-gray-700">User: {payment.user}</p>
              <p className="text-gray-700">Amount: ${payment.amount.toFixed(2)}</p>
              <p className={`text-gray-700 ${payment.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                Status: {payment.status}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentsAdminPage;
