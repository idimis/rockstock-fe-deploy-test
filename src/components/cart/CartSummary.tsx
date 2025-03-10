"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils/format";
import { CartSummaryProps } from "@/types/cart";

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between w-full p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-black">Cart summary</h3>
      <div className="flex justify-between items-center">
        <p className="text-black">Total</p>
        <h3 className="text-lg text-black font-semibold">{formatCurrency(totalPrice)}</h3>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition"
        onClick={() => router.push("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;