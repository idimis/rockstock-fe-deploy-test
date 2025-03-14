"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils/format";
import { DetailPaymentProps } from "@/types/payment";
import { toast } from "react-toastify";
import { fetchPaymentMethods } from "@/services/paymentService";

const DetailPayment: React.FC<DetailPaymentProps> = ({ 
  subtotal, 
  shippingFee, 
  totalPrice, 
  onShowPopup,
  paymentMethods,
  setPaymentMethods,
  selectedMethod, 
  setSelectedMethod 
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        setLoading(true);
        const paymentMethodData = await fetchPaymentMethods();
        if (paymentMethodData) {
          setPaymentMethods(paymentMethodData);
        }
        console.log("Payment Methods: ", paymentMethods);
        
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getPaymentMethods();
  }, [paymentMethods, setPaymentMethods]);

  const handlePayNow = () => {
    if (!selectedMethod) {
      alert("Please select a payment method before proceeding!");
      return;
    }
    onShowPopup();
  };

  return (
    <div className="flex flex-col justify-between w-full p-6 bg-white shadow-md rounded-lg">
      <div>
        <div className="mb-6 border-b border-gray-300 pb-2">
          <h3 className="text-xl font-semibold mb-4 text-black">Payment Methods</h3>
          {loading ? (
            <p className="text-gray-500">Fetching payment methods...</p>
          ) : paymentMethods.length > 0 ? (
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label key={method.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="form-radio text-red-600"
                  />
                  <span className="text-black">{method.name}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No payment methods available.</p>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-4 text-black">Payment Details</h3>
        <div className="flex flex-col gap-2 text-black">
          <p className="flex justify-between">
            <span>Subtotal</span> {formatCurrency(subtotal)}
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span> {formatCurrency(shippingFee)}
          </p>
        </div>
      </div>

      <div>
        <p className="flex justify-between text-xl text-black font-semibold border-t border-gray-300 pt-2">
          <span>Total</span> {formatCurrency(totalPrice)}
        </p>
        <button
          disabled={!selectedMethod}
          className={`mt-4 px-6 py-4 text-white text-xl font-bold rounded-lg w-full ${
            selectedMethod
              ? "bg-red-600 hover:bg-red-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handlePayNow}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default DetailPayment;