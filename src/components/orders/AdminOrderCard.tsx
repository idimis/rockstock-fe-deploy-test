"use client";

import Image from "next/image";
import { AdminOrderCardProps } from "@/types/order";
import { formatCurrency, formatStatus } from "@/lib/utils/format";
import { statusColors } from "@/constants/statusColors";

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ decoded, order, onOpenDetail, onOpenPaymentProof, onRejectPaymentProof, onApprovePaymentProof, onDeliverOrder, onCancel }) => {
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
          See Order Detail
        </button>

        {decoded?.roles === "Super Admin" && order.status === "PAYMENT_VERIFICATION" && (
          <div className="flex gap-2 items-center">
            <button
              className="px-4 py-1 bg-blue-600 text-sm font-semibold text-white rounded-lg hover:bg-blue-500"
              onClick={() => onOpenPaymentProof(order)}
            >
              Open Payment Proof
            </button>
            <button
              className="px-4 py-1 bg-red-600 text-sm font-semibold text-white rounded-lg hover:bg-red-500"
              onClick={() => onRejectPaymentProof(order)}
            >
              Reject Payment Proof
            </button>
            <button
              className="px-4 py-1 bg-green-600 text-sm font-semibold text-white rounded-lg hover:bg-green-500"
              onClick={() => onApprovePaymentProof(order)}
            >
              Approve Payment Proof
            </button>
          </div>
        )}
        {decoded?.roles === "Super Admin" && order.status === "PROCESSING" && (
          <div className="flex gap-2 items-center">
            <button
              className="px-4 py-1 bg-red-600 text-sm font-semibold text-white rounded-lg hover:bg-red-500"
              onClick={() => onCancel(order)}
            >
              Cancel Order
            </button>
            <button
              className="px-4 py-1 bg-green-600 text-sm font-semibold text-white rounded-lg hover:bg-green-500"
              onClick={() => onDeliverOrder(order)}
            >
              Deliver Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderCard;