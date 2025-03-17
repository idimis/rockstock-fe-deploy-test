// import { useSearchParams, useRouter } from "next/navigation";
// import { useMutationJournals } from "@/hooks/useMutationJournals";
// import MutationJournalItemSkeleton from "@/components/dashboardAdmin/journal/MutationJournalSkeleton";
// import Pagination from "@/components/dashboardAdmin/Pagination";
// import SearchBar from "@/components/dashboardAdmin/journal/SearchBar";
// import MutationJournalItem from "@/components/dashboardAdmin/journal/MutationJournalItem";
// import MutationJournalFilter from "@/components/dashboardAdmin/journal/MutationJournalFilter";
// import { useState, useEffect, Suspense } from "react";
// import { MutationJournal } from "@/types/mutationJournal"; // update this type for mutation journals
// // import AdjustMutationJournalModal from "@/components/dashboardAdmin/mutationJournal/AdjustMutationJournalModal";
// // import CreateMutationJournalModal from "@/components/dashboardAdmin/mutationJournal/CreateMutationJournalModal";

// const MutationJournalTable = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const currentPage = Number(searchParams.get("page")) || 1;
//   const searchQuery = searchParams.get("search") || "";
//   const warehouseId = searchParams.get("warehouse");
//   const pageSize = 5;

//   const status = searchParams.get("status") || null;
//   const adjustmentType = searchParams.get("adjustmentType") || null; 

//   const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
//   const [sortDirection, setSortDirection] = useState<string>("asc");

//   const { data, isLoading } = useMutationJournals(currentPage, pageSize, searchQuery, selectedWarehouse, sortDirection);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingMutationJournal, setEditingMutationJournal] = useState<MutationJournal | null>(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   useEffect(() => {
//     if (warehouseId) {
//       setSelectedWarehouse(Number(warehouseId));
//     }
//   }, [warehouseId]);

//   const handleFilterChange = (filters: {
//     warehouse?: number | null;
//     sortDirection?: string;
//     status?: string;
//     adjustmentType?: string;
//   }) => {
//     const params = new URLSearchParams();
    
//     if (filters.warehouse) params.set("warehouse", String(filters.warehouse));
//     if (filters.sortDirection) params.set("sort", filters.sortDirection);
//     if (filters.status) params.set("status", filters.status);
//     if (filters.adjustmentType) params.set("adjustmentType", filters.adjustmentType);
//     if (searchQuery) params.set("search", searchQuery);
  
//     params.set("page", "1");
  
//     router.push(`/dashboard/admin/journals?${params.toString()}`);
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 justify-center">
//         <h2 className="text-2xl md:text-4xl text-center font-semibold text-gray-800 mb-6 md:mb-0">
//           📰 Mutation Journal Management
//         </h2>
//         <div className="flex justify-center md:justify-end w-full md:w-auto">
//           <button
//             className="bg-blue-500 text-xl text-white px-2 py-2 rounded w-2/3 md:w-48"
//             onClick={() => setIsCreateModalOpen(true)}
//           >
//             Create Mutation Journal
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="w-full">
//           {/* Commenting out filter for now */}
//           <MutationJournalFilter
//             currentSortDirection={sortDirection}
//             currentWarehouse={selectedWarehouse}
//             handleFilterChange={handleFilterChange}
//           />
//         </div>
//         <div className="w-full md:w-1/2 flex md:justify-end">
//           <Suspense fallback={<div>Loading Mutation Journal Management...</div>}>
//             <SearchBar basePath="/dashboard/admin/journals" />
//           </Suspense>
//         </div>
//       </div>

//       <div className="space-y-4 mt-6">
//         {isLoading ? (
//           Array.from({ length: 5 }).map((_, index) => <MutationJournalItemSkeleton key={index} />)
//         ) : (data?.content ?? []).length > 0 ? (
//           (data?.content ?? []).map((journal: MutationJournal) => (
//             <MutationJournalItem 
//               key={journal.journalId}
//               journal={journal}
//               onEdit={() => {
//                 setEditingMutationJournal(journal);
//                 setIsModalOpen(true);
//               }}
//             />
//           ))
//         ) : (
//           !isLoading && (
//             <div className="text-center text-gray-500 mt-4">
//               {searchQuery ? `No journals found for "${searchQuery}"` : "No journals available"}
//             </div>
//           )
//         )}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={data?.totalPages ?? 1}
//         onPageChange={(page) => {
//           router.push(`/dashboard/admin/journals?page=${page}&search=${searchQuery}&warehouse=${selectedWarehouse}`);
//         }}
//         basePath={"/dashboard/admin/journals"}
//       />

//       {/* <AdjustMutationJournalModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         journal={editingMutationJournal}
//         warehouseId={selectedWarehouse ?? editingMutationJournal?.originWarehouse ?? null}
//         onRefresh={refreshMutationJournals}
//       />
//       /> */}
//     </div>
//   );
// };

// export default MutationJournalTable;