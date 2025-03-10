"use client";

import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "@/types/product";

export const useCategories = (page: number, pageSize: number, searchQuery?: string) => {
    return useQuery<CategoriesResponse>({
      queryKey: ["categories", page, pageSize, searchQuery],
      queryFn: async () => {
        const response = await axiosInstance.get(`/categories`, {
          params: { 
            page: page - 1,
            size: pageSize,
            categoryName: searchQuery || undefined,
          },
        });
        return response.data.data;
      },
    });
  };