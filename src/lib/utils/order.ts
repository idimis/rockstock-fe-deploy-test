import { fetchOrders, updateOrderStatus } from "@/services/orderService";
import { Order, OrderFilterProps } from "@/types/order";

export const fetchAndSetOrders = async (
  filters: OrderFilterProps["filters"],
  page: number,
  size: number,
  setOrders: (orders: Order[]) => void,
  setTotalPages: (totalPages: number) => void
) => {
  try {
    const { orders, totalPages } = await fetchOrders(
      filters.status,
      page,
      size,
      `${filters.sortBy},${filters.sortOrder}`,
      filters.startDate,
      filters.endDate,
      filters.warehouseId
    );
    setOrders(orders);
    setTotalPages(totalPages);
  } catch (error) {
    console.error("Failed to fetch orders", error);
  }
};

export const handleOpenPaymentProof = (order: Order) => {
  if (order.paymentProof) {
    window.open(order.paymentProof, "_blank");
  } else {
    console.warn("No payment proof available for this order.");
  }
};

export const handleGatewayPayment = (order: Order) => {
  if (order.paymentRedirectUrl) {
    window.open(order.paymentRedirectUrl, "_blank");
  } else {
    console.warn("No payment proof available for this order.");
  }
};

export const handleRejectPaymentProof = async (
  order: Order, 
  filters: OrderFilterProps["filters"], 
  page: number, 
  size: number, 
  setOrders: (orders: Order[]) => void, 
  setTotalPages: (totalPages: number) => void,
) => {
  try {
    await updateOrderStatus("WAITING_FOR_PAYMENT", {}, order.orderId);
    console.log("Payment proof not approved");
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages);
  } catch (error) {
    console.error("Failed to reject payment proof", error);
  }
};

export const handleApprovePaymentProof = async (
  order: Order, 
  filters: OrderFilterProps["filters"], 
  page: number, 
  size: number, 
  setOrders: (orders: Order[]) => void, 
  setTotalPages: (totalPages: number) => void
) => {
  try {
    await updateOrderStatus("PROCESSING", {}, order.orderId);
    console.log("Payment proof approved");
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages);
  } catch (error) {
    console.error("Failed to approve payment proof", error);
  }
};

export const handleDeliverOrder = async (
  order: Order, 
  filters: OrderFilterProps["filters"], 
  page: number, 
  size: number, 
  setOrders: (orders: Order[]) => void, 
  setTotalPages: (totalPages: number) => void
) => {
  try {
    await updateOrderStatus("ON_DELIVERY", {}, order.orderId);
    console.log("Order on delivery");
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages);
  } catch (error) {
    console.error("Failed to deliver order", error);
  }
};

export const handleCompleteOrder = async (
  order: Order, 
  filters: OrderFilterProps["filters"], 
  page: number, 
  size: number, 
  setOrders: (orders: Order[]) => void, 
  setTotalPages: (totalPages: number) => void
) => {
  try {
    await updateOrderStatus("COMPLETED", {}, order.orderId);
    console.log("Order completed");
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages);
  } catch (error) {
    console.error("Failed to complete the order", error);
  }
};

export const handleCancelOrder = async (
  order: Order, 
  filters: OrderFilterProps["filters"], 
  page: number, 
  size: number, 
  setOrders: (orders: Order[]) => void, 
  setTotalPages: (totalPages: number) => void
) => {
  try {
    await updateOrderStatus("CANCELED", {}, order.orderId);
    console.log("Order canceled successfully");
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages);
  } catch (error) {
    console.error("Failed to cancel the order", error);
  }
};
