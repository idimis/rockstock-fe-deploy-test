import { useSearchParams, useRouter } from "next/navigation";
import { useMutationJournals } from "@/hooks/useMutationJournals";
import MutationJournalItemSkeleton from "@/components/dashboardAdmin/journal/MutationJournalSkeleton";
import Pagination from "@/components/dashboardAdmin/Pagination";
import SearchBar from "@/components/dashboardAdmin/journal/SearchBar";
import MutationJournalItem from "@/components/dashboardAdmin/journal/MutationJournalItem";
import MutationJournalFilter from "@/components/dashboardAdmin/journal/MutationJournalFilter";
import { useState, useEffect, Suspense } from "react";
import { MutationJournal } from "@/types/mutationJournal";

const MutationJournalTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const warehouseId = searchParams.get("warehouse");
  const pageSize = 5;

  const status = searchParams.get("status") || null;
  const adjustmentType = searchParams.get("adjustmentType") || null; 

  const sortFromParams = searchParams.get("sort") || "desc";
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<string>(sortFromParams);

  const { data, isLoading } = useMutationJournals(currentPage, pageSize, searchQuery, selectedWarehouse, sortDirection, status, adjustmentType);

  useEffect(() => {
    if (warehouseId) {
      setSelectedWarehouse(Number(warehouseId));
    }
  }, [warehouseId]);

  const handleFilterChange = (filters: {
    warehouse?: number | null;
    sortDirection?: string;
    status?: string | null;
    adjustmentType?: string | null;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
  
    if (filters.warehouse !== undefined) {
      if (filters.warehouse === null) {
        params.delete("warehouse");
        setSelectedWarehouse(null);
      } else {
        params.set("warehouse", String(filters.warehouse));
        setSelectedWarehouse(filters.warehouse);
      }
    }
  
    if (filters.sortDirection) {
      params.set("sort", filters.sortDirection);
      setSortDirection(filters.sortDirection);
    }
  
    if (filters.status !== undefined) {
      if (filters.status === null) {
        params.delete("status");
      } else {
        params.set("status", filters.status);
      }
    }
  
    if (filters.adjustmentType !== undefined) {
      if (filters.adjustmentType === null) {
        params.delete("adjustmentType");
      } else {
        params.set("adjustmentType", filters.adjustmentType);
      }
    }
  
    if (searchQuery) params.set("search", searchQuery);
  
    params.set("page", "1");
  
    router.push(`/dashboard/admin/journals?${params.toString()}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 justify-center">
        <h2 className="text-2xl md:text-4xl text-center font-semibold text-gray-800 mb-6 md:mb-0">
          📰 Mutation Journal Management
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <MutationJournalFilter
            currentSortDirection={sortDirection}
            currentWarehouse={selectedWarehouse}
            currentStatus={status}
            currentAdjustmentType={adjustmentType}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full md:w-1/2 flex md:justify-end">
          <Suspense fallback={<div>Loading Mutation Journal Management...</div>}>
            <SearchBar basePath="/dashboard/admin/journals" />
          </Suspense>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => <MutationJournalItemSkeleton key={index} />)
        ) : selectedWarehouse === null ? (
          <div className="text-center text-gray-500 mt-4">
            Please choose a warehouse
          </div>
        ) : (data?.content ?? []).length > 0 ? (
          (data?.content ?? []).map((journal: MutationJournal) => (
            <MutationJournalItem 
              key={journal.journalId}
              journal={journal}
              warehouseId={selectedWarehouse}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            {searchQuery ? `No journals found for "${searchQuery}"` : "No journals available"}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        basePath={"/dashboard/admin/journals"}
      />

    </div>
  );
};

export default MutationJournalTable;