"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddToCartButtonProps } from "@/types/cart";
import { getAccessToken } from "@/lib/utils/auth";
import { addToCart } from "@/services/cartService";

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, quantity }) => {
  const [loading, setLoading] = useState(false);
  const accessToken = getAccessToken();

  const handleAddToCart = async () => {
    if (!accessToken) {
      toast.error("Please login first to add items to the cart.");
      return;
    }

    setLoading(true);

    try {
      const response = await addToCart({ productId, quantity });

      if (response.status === 200) {
        toast.success("Added to cart successfully!");
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message === "Hit stock limit !"
          ? "You've reached the stock limit for this product!"
          : axiosError.response?.data?.message || "Failed to add item to cart. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`mt-3 px-4 py-2 w-full rounded-md transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white"
        }`}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </>
  );
};

export default AddToCartButton;
