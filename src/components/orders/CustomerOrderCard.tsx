"use client";

import Image from "next/image";
import { CustomerOrderCardProps } from "@/types/order";
import { formatCurrency, formatStatus } from "@/lib/utils/format";
import { statusColors } from "@/constants/statusColors";
import { useState } from "react";

const CustomerOrderCard: React.FC<CustomerOrderCardProps> = ({ order, onLoadingOrderItems, onOpenDetail, onGatewayPayment, onUploadPaymentProof, onCancel, onComplete }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleCancel = async () => {
    setLoadingCancel(true);
    await onCancel(order);
    setLoadingCancel(false);
    setShowCancelModal(false);
  };

  const handleComplete = async () => {
    setLoadingComplete(true);
    await onComplete(order);
    setLoadingComplete(false);
    setShowCompleteModal(false);
  };
  
  return (
    <div key={order.orderId} className="border p-4 my-2 w-full bg-white rounded-lg shadow mx-auto">
      <div>
        <div className="flex justify-between items-center pb-2 px-1 border-b border-gray-300">
          <div className="flex flex-col gap-2 text-xs sm:text-sm sm:flex-row">
            <div className="flex flex-col text-black font-semibold md:min-w-[240px] sm:flex-row sm:gap-2">
              <p>Order Date:</p>
              <p>{order.formattedCreatedAt}</p>
            </div>
            <p className="hidden text-sm md:col-span-2 md:flex">{order.orderCode}</p>
          </div>
          <div
            className={`px-2 py-1 text-xs rounded-lg inline-block md:text-xs ${statusColors[order.status].bg} ${statusColors[order.status].text}`}
          >
            {formatStatus(order.status)}
          </div>
        </div>
        {order.firstOrderItem ? (
          <div className="mt-4 flex flex-col gap-2 pb-4 px-1 border-b border-gray-300 md:items-center md:flex-row md:justify-between">
            <div className="flex gap-2 w-full md:border-r md:border-gray-300">
              {order.firstOrderItem.productPicture?.productPictureUrl ? (
                <Image
                  src={order.firstOrderItem.productPicture?.productPictureUrl}
                  alt={order.firstOrderItem.productName}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                />
              ) : (
                <p>[No Product Image]</p>
              )}
              <div className="flex flex-col">
                <p className="text-lg text-black font-semibold">{order.firstOrderItem.productName}</p>
                <div className="flex gap-1 text-sm text-gray-700">
                  <p>{order.firstOrderItem.quantity}</p>
                  <p>x</p>
                  <p>{formatCurrency(order.firstOrderItem.price)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:mx-auto md:min-w-[180px]">
              <p className="text-sm text-gray-700">Total payment</p>
              <p className="text-black text-md font-semibold">{formatCurrency(order.totalPayment)}</p>
            </div>
          </div>
        ) : (
          <p>No order items found.</p>
        )}
      </div>
      <div className="flex gap-2 px-1 mt-2 items-center justify-end">
        <button 
          className="px-2 py-1 bg-white text-sm font-semibold text-red-500"
          onClick={() => onOpenDetail(order)}
        >
          {onLoadingOrderItems ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <p>See Order Detail</p>
          )}
        </button>
        {order.status === "WAITING_FOR_PAYMENT" && (
          <div className="flex gap-2 items-center">
            <button
              className="px-4 py-1 bg-red-600 text-sm font-semibold text-white rounded-lg hover:bg-red-500"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Order
            </button>
            {order.paymentMethod === "Manual Bank Transfer" && (
              <button
                className="px-4 py-1 bg-blue-600 text-sm font-semibold text-white rounded-lg hover:bg-blue-500"
                onClick={() => onUploadPaymentProof(order)}
              >
                Upload Payment Proof
              </button>
            )}
            {order.paymentMethod === "Gateway Payments" && (
              <button
                className="px-4 py-1 bg-blue-600 text-sm font-semibold text-white rounded-lg hover:bg-blue-500"
                onClick={() => onGatewayPayment(order)}
              >
                Pay
              </button>
            )}
          </div>
        )}
        {order.status === "ON_DELIVERY" && (
          <button
            className="px-4 py-1 bg-green-600 text-sm font-semibold text-white rounded-lg hover:bg-green-500"
            onClick={() => setShowCompleteModal(true)}
          >
            Complete Order
          </button>
        )}
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900">Cancel Order</h2>
            <p className="text-sm text-gray-600 mt-2">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-1 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowCancelModal(false)}
              >
                No, Keep Order
              </button>
              <button
                className="px-4 py-1 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 flex items-center justify-center"
                onClick={handleCancel}
                disabled={loadingCancel}
              >
                {loadingCancel ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "Yes, Cancel Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showCompleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900">Cancel Order</h2>
            <p className="text-sm text-gray-600 mt-2">Are you sure you want to complete this order?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-1 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowCancelModal(false)}
              >
                No
              </button>
              <button
                className="px-4 py-1 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 flex items-center justify-center"
                onClick={handleComplete}
                disabled={loadingComplete}
              >
                {loadingComplete ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "Yes, Complete Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderCard;