import axiosInstance from "@/utils/axiosInstance";
import { Product, Category } from "@/types/product";

export const fetchProduct = async (productId: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/categories");
  return response.data.data.content;
};

export const updateProduct = async ({ productId, values }: { productId: string; values: Partial<Product> }) => {
  const response = await axiosInstance.patch(`/products/${productId}/update`, values);
  return response.data;
};