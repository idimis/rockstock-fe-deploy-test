"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/product";

export const useProducts = (
  page: number,
  pageSize: number = 10,
  searchQuery: string,
  categoryId?: number | null,
  sortField: string = "name",
  sortDirection: string = "asc"
) => {
  return useQuery<ApiResponse>({
    queryKey: ["products", page, pageSize, searchQuery, categoryId, sortField, sortDirection],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/active", {
        params: {
          page: page - 1,
          size: pageSize,
          name: searchQuery,
          categoryId: categoryId,
          sortField,
          sortDirection,
        },
      });
      return response.data;
    },
  });
};