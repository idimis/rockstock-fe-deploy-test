"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { StocksResponse } from "@/types/stock";

export const useStocks = (
  page: number,
  pageSize: number = 10,
  searchQuery: string,
  warehouseId?: number | null,
  sortDirection: string = "asc"
) => {
  return useQuery<StocksResponse>({
    queryKey: ["stocks", page, pageSize, searchQuery, warehouseId, sortDirection],
    queryFn: async () => {
      const response = await axiosInstance.get("/stocks", {
        params: {
          page: page - 1,
          size: pageSize,
          productName: searchQuery || undefined,
          warehouseId: warehouseId,
          sortDirection,
        },
      });
      return response.data.data ?? null;
    },
  });
};