import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { AddToCartButtonProps, CartItem } from "@/types/cart";

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addToCart = async (payload: AddToCartButtonProps, attempt = 1): Promise<AxiosResponse> => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("Unauthorized: No token provided");

    const response = await axios.post(
      `${API_BASE_URL}/carts/item`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error add to cart:", errorMessage);

    if (errorMessage.includes("JDBC") && attempt <= 3) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying addToCart in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return addToCart(payload, attempt + 1); // Ensure all parameters are passed
    } else {
      throw new Error(errorMessage || "Failed to add to cart");
    }
  }
}

export const fetchCartQuantity = async (setCartQuantity: (quantity: number) => void, attempt = 1): Promise<void> => {
  const accessToken = getAccessToken();
  const updateCartQuantity = (quantity: number) => {
    setCartQuantity(quantity);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  if (!accessToken) {
    setCartQuantity(0);
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/carts/active`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.data.success && response.data.data) {
      updateCartQuantity(response.data.data.itemQuantity || 0);
    } else {
      updateCartQuantity(0);
    }
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error fetching cart items:", errorMessage);

    if (errorMessage.includes("JDBC") && attempt <= 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying fetchCartQuantity in ${retryDelay / 1000}s...`);
      setTimeout(() => fetchCartQuantity(setCartQuantity, attempt + 1), retryDelay);
    } else {
      console.error(errorMessage || "Failed to fetch cart items");
      updateCartQuantity(0);
    }
  }
};

export const fetchCartItems = async (attempt = 1) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/carts/active/products`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.data?.success || response.data?.data === null) {
      return [];
    }

    return response.data.data;
  } catch (err: unknown) {
    const errorResponse = (err as unknown as AxiosErrorResponse).response;
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;

    if (errorResponse?.status === 401) {
      throw new Error("Unauthorized");
    }

    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying getCartData in ${retryDelay / 1000}s...`);
      setTimeout(() => fetchCartItems(attempt + 1), retryDelay);
    } else {
      console.log("Unknown Error Fetcing Cart Items!");
    }
  }
};

export const increaseCartItemQuantity = async (productId: number, attempt = 1) => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Unauthorized: No token provided");

  try {
    await axios.put(`${API_BASE_URL}/carts/add`, {}, {
      params: { productId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    window.dispatchEvent(new Event("storage"));
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error increasing cart quantity:", errorMessage);

    if (errorMessage.includes("JDBC") && attempt <= 3) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying increaseCartItemQuantity in ${retryDelay / 1000}s...`);
      setTimeout(() => increaseCartItemQuantity(productId, attempt + 1), retryDelay);
    } else {
      console.error("Failed to increase cart quantity");
    }
  }
};

export const decreaseCartItemQuantity = async (productId: number, currentQuantity: number, attempt = 1) => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Unauthorized: No token provided");

  if (currentQuantity === 1) return;

  try {
    await axios.put(`${API_BASE_URL}/carts/subtract`, {}, {
      params: { productId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  
    window.dispatchEvent(new Event("storage"));
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error decreasing cart quantity:", errorMessage);

    if (errorMessage.includes("JDBC") && attempt <= 3) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying decreaseCartItemQuantity in ${retryDelay / 1000}s...`);
      setTimeout(() => decreaseCartItemQuantity(productId, currentQuantity, attempt + 1), retryDelay);
    } else {
      console.error("Failed to decrease cart quantity");
    }
  }
};

export const removeCartItem = async (cartItemId: number, attempt = 1) => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Unauthorized: No token provided");

  try {
    await axios.delete(`${API_BASE_URL}/carts/remove`, {
      params: { cartItemId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  
    window.dispatchEvent(new Event("storage"));
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;
    console.error("Error removing cart item:", errorMessage);

    if (errorMessage.includes("JDBC") && attempt <= 3) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying removeCartItem in ${retryDelay / 1000}s...`);
      setTimeout(() => removeCartItem(cartItemId, attempt + 1), retryDelay);
    } else {
      console.error("Failed to remove cart item");
    }
  }
};