"use client";

import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format";
import { OrderSummaryProps } from "@/types/order";

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.cartItemId} className="flex items-center border-b border-gray-300 pb-4 mb-4">
          <div className="flex items-center gap-4 w-full">
            <Image
              src={item.productPictures?.productPictureUrl || "/placeholder.png"}
              alt={item.productName}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="w-full flex flex-col justify-between md:flex-row">
              <h3 className="text-lg text-black">{item.productName}</h3>
              <p className="text-black font-semibold">{item.quantity} x {formatCurrency(item.productPrice)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;