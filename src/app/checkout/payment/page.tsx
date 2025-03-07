"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const PaymentPage = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePayment = () => {
    router.push("/checkout/success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Payment</h1>
        <p className="text-black mb-6">Choose your payment method and complete your order.</p>

        <div className="p-6 rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-black">Select Payment Method</h2>
          
          {/* Payment Options */}
          <div className="flex flex-col space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="credit-card"
                checked={paymentMethod === "credit-card"}
                onChange={() => setPaymentMethod("credit-card")}
                className="mr-2"
              />
              <span className="text-black">Credit Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="paypal"
                onChange={() => setPaymentMethod("paypal")}
                className="mr-2"
              />
              <span className="text-black">PayPal</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="crypto"
                onChange={() => setPaymentMethod("crypto")}
                className="mr-2"
              />
              <span className="text-black">Crypto (Bitcoin, Ethereum)</span>
            </label>
          </div>

          {/* Credit Card Form (dummy) */}
          {paymentMethod === "credit-card" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-black">Enter Card Details</h3>
              <input type="text" placeholder="Card Number" className="block w-full mt-2 p-2 border rounded-lg" />
              <input type="text" placeholder="MM/YY" className="block w-1/2 mt-2 p-2 border rounded-lg" />
              <input type="text" placeholder="CVC" className="block w-1/4 mt-2 p-2 border rounded-lg" />
            </div>
          )}

          <button
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-500 w-full md:w-auto"
            onClick={handlePayment}
          >
            Confirm Payment
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
