"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { AddToCartButtonProps } from "@/types/cart";
import { getAccessToken } from "@/lib/utils/auth";
import { addToCart } from "@/services/cartService";

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, quantity }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const accessToken = getAccessToken();
  console.log("Button Product Id: ", productId);
  
  
  const handleAddToCart = async () => {
    if (!accessToken) {
      setError("Please log in to add items to the cart.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await addToCart({
          productId, quantity
          // cartItemId: 0,
          // totalAmount: 0,
          // cartId: 0,
          // productName: "",
          // productImage: "",
          // productPrice: 0,
          // productWeight: 0,
          // productPictures: null
      });
      if (response.status === 200) {
        setSuccess(true);
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;

      console.error("Error adding to cart:", axiosError);
      setError(
        axiosError.response?.data?.message === "Hit stock limit !"
          ? "You've reached the stock limit for this product!"
          : axiosError.response?.data?.message || "Failed to add item to cart. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading || !accessToken}
        className={`mt-3 px-4 py-2 w-full rounded-md transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white"
        }`}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Added to cart successfully!</p>}
    </div>
  );
};

export default AddToCartButton;