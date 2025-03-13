"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { Product } from "@/types/product";

export const useProductDetail = (id: number) => {
  return useQuery<Product>({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};