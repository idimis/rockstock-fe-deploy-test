import { MutationJournalResponse } from "@/types/mutationJournal";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useMutationJournals = (
  page: number,
  pageSize: number = 10,
  searchQuery: string,
  warehouseId?: number | null,
  sortDirection: string = "desc",
  status?: string | null,
  adjustmentType?: string | null,
  stockChangeType?: string | null
) => {
  return useQuery<MutationJournalResponse>({
    queryKey: [
      "mutationJournals",
      page,
      pageSize,
      searchQuery,
      warehouseId,
      sortDirection,
      status,
      adjustmentType,
      stockChangeType,
    ],
    queryFn: async () => {
      const response = await axiosInstance.get("/mutations", {
        params: {
          page: page - 1,
          size: pageSize,
          productName: searchQuery || undefined,
          warehouseId: warehouseId ?? undefined,
          sortField: "updatedAt",
          sortDirection,
          status: status || undefined,
          adjustmentType: adjustmentType || undefined,
          stockChangeType: stockChangeType || undefined,
        },
      });
      return response.data ?? null;
    },
    enabled: warehouseId !== null,
  });
};