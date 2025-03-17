// "use client";

// import axiosInstance from "@/utils/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
// import { MutationJournalResponse } from "@/types/mutationJournal";

// export const useMutationJournals = (
//   page: number,
//   pageSize: number = 10,
//   searchQuery: string,
//   warehouseId?: number | null,
//   sortDirection: string = "desc",
//   status?: string,
//   adjustmentType?: string,
//   stockChangeType?: string
// ) => {
//   return useQuery<MutationJournalResponse>({
//     queryKey: [
//       "mutationJournals",
//       page,
//       pageSize,
//       searchQuery,
//       warehouseId,
//       sortDirection,
//       status,
//       adjustmentType,
//       stockChangeType,
//     ],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/mutations", {
//         params: {
//           page: page - 1,
//           size: pageSize,
//           productName: searchQuery || undefined,
//           warehouseId: warehouseId ?? undefined,
//           sortDirection,
//           status: status || undefined,
//           adjustmentType: adjustmentType || undefined,
//           stockChangeType: stockChangeType || undefined, 
//         },
//       });
//       console.log("✅ API Response (Mutation Journals):", response.data);
    
//       return response.data ?? null;
//     },
//   });
// };