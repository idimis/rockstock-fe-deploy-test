import axios from "axios";
import { Order, OrderItem } from "@/types/order";
import { getAccessToken } from "@/lib/utils/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const accessToken = getAccessToken();
console.log("Order Service Token: ", accessToken);


export const fetchOrders = async (
  status: string | null, 
  page: number = 1, 
  size: number = 10, 
  sort: string = "createdAt,desc",
  startDate: string | null = null, 
  endDate: string | null = null,
  warehouseId: string | null = null,
  attempt = 1
): Promise<{ orders: Order[], totalPages: number }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`, {
      params: { 
        status, 
        page: page - 1,
        size, 
        sortBy: sort.split(",")[0],
        sortDirection: sort.split(",")[1],
        startDate,
        endDate,
        warehouseId
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      orders: response.data?.data?.content || [],
      totalPages: response.data?.data?.totalPages || 1,
    };
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error fetching orders:", errorMessage);

    if (errorMessage.includes("JDBC") && attempt <= 3) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying fetchOrders in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return fetchOrders(status, page, size, sort, startDate, endDate, warehouseId, attempt + 1); // Ensure all parameters are passed
    } else {
      throw new Error("Failed to fetch orders");
    }
  }
};


export const fetchOrderItems = async (orderId: number, attempt = 1): Promise<OrderItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/items`, {
      params: { orderId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data?.data || [];
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error fetching order items:", errorMessage);

    if (errorMessage.includes("JDBC")) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying fetchOrderItems in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return fetchOrderItems(orderId, attempt + 1);
    } else {
      throw new Error("Failed to fetch order items");
    }
  }
};

export const updateOrderStatus = async (
  status: string | null, 
  data: object,
  orderId?: number,
  orderCode?: string,
  attempt = 1
): Promise<Order[]> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/orders/statuses/status`,
      data,
      {
        params: {
          orderId,
          orderCode,
          newStatus: status,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data?.data;
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error updating order status:", errorMessage);

    if (errorMessage.includes("JDBC")) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying updateOrderStatus in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return updateOrderStatus(status, data, orderId, orderCode, attempt + 1);
    } else {
      throw new Error("Failed to update order status");
    }
  }
}

export const placeOrder = async (
  shippingFee: number,
  addressId: number | null,
  selectedMethod: number | null,
  accessToken: string | null
) => {
  if (!addressId) {
    throw new Error("Please select an address before proceeding with payment.");
  }

  const response = await axios.post(
    `${API_BASE_URL}/orders`,
    {
      deliveryCost: shippingFee,
      addressId: addressId,
      paymentMethodId: selectedMethod,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return response.data?.data;
};