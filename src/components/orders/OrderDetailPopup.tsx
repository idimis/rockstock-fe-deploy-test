import Image from "next/image";
import { OrderDetailPopupProps } from "@/types/order";
import { IoClose } from "react-icons/io5";
import { formatCurrency, formatStatus } from "@/lib/utils/format";

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({ order, orderItems, isLoading, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-gray-200 rounded-lg w-3/5">
        <div className="flex justify-between items-center bg-white p-4 border-b border-gray-300 rounded-t-lg">
          <h3 className="text-xl font-semibold text-black">Order Details</h3>
          <button onClick={onClose}>
            <IoClose color="red" size={24} />
          </button>
        </div>
        <div className="bg-white px-4 py-2 flex flex-col gap-2 rounded-b-lg">
          <p className="text-black"><strong>Order Status: {formatStatus(order.status)}</strong></p>
          <div className="pb-4 border-b border-gray-400">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-600">Order Code</p>
              <p className="text-red-700">{order.orderCode}</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-600">Order Date</p>
              <p className="text-black">{order.formattedCreatedAt}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="pb-4 border-b border-gray-400">
            <h3 className="text-md font-semibold text-black mb-2">Order Items</h3>
            {isLoading ? (
              <p className="text-center text-black">Loading...</p>
            ) : orderItems.length > 0 ? (
              orderItems.map((orderItem) => (
                <div key={orderItem.id} className="border-b border-gray-300 flex gap-2 pb-2 mb-2">
                  {orderItem.productPicture?.productPictureUrl ? (
                    <Image
                      src={orderItem.productPicture.productPictureUrl}
                      alt={orderItem.productName}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <p>[No Image]</p>
                  )}
                  <div className="flex flex-col">
                    <p className="text-md text-black font-semibold">{orderItem.productName}</p>
                    <p className="text-sm text-gray-700">{orderItem.productDetail}</p>
                    <div className="flex gap-1 text-sm text-gray-700">
                      <p>{orderItem.quantity}</p>
                      <p>x</p>
                      <p>{formatCurrency(orderItem.price)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-black">No items found.</p>
            )}
          </div>

          {/* Payment Detail */}
          <div className="pb-4 rounded-b-lg flex flex-col gap-2">
            <h3 className="text-md font-semibold text-black">Order Summary</h3>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm mb-2">
                <p className="text-gray-600">Payment Method</p>
                <p className="text-black">{order.paymentMethod}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-600">Subtotal Price</p>
                <p className="text-black">{formatCurrency(order.totalPrice)}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-600">Delivery Cost</p>
                <p className="text-black">{formatCurrency(order.deliveryCost)}</p>
              </div>
              <div className="flex justify-between items-center text-md text-black font-semibold mt-2">
                <p>Total Payment</p>
                <p>{formatCurrency(order.totalPayment)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPopup;