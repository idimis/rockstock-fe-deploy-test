import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateDraft = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/products/draft");
      return response.data;
    },
    
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
      router.push(`/dashboard/admin/products/draft/${data.productId}`);
    },
    onError: () => {
    },
  });
};