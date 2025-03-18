import { useSearchParams, useRouter } from "next/navigation";
import { useStocks } from "@/hooks/useStocks";
import StockItemSkeleton from "@/components/dashboardAdmin/stock/StockItemSkeleton";
import Pagination from "@/components/dashboardAdmin/Pagination";
import SearchBar from "@/components/dashboardAdmin/stock/SearchBar";
import StockItem from "@/components/dashboardAdmin/stock/StockItem";
import StockFilter from "@/components/dashboardAdmin/stock/StockFilter";
import { useState, useEffect, Suspense } from "react";
import { Stock } from "@/types/stock";
import AdjustStockModal from "@/components/dashboardAdmin/stock/AdjustStockModal";
import CreateStockModal from "@/components/dashboardAdmin/stock/CreateStockModal";

const StockTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const warehouseId = searchParams.get("warehouse");
  const pageSize = 4;

  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  // ⬇️ Do not fetch data until a warehouse is selected
  const { data, isLoading, refetch } = useStocks(
    currentPage,
    pageSize,
    searchQuery,
    selectedWarehouse ? selectedWarehouse : undefined, // Fetch only when warehouse is selected
    sortDirection
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (warehouseId) {
      setSelectedWarehouse(Number(warehouseId));
    } else {
      setSelectedWarehouse(null); // Reset data when choosing "Choose Warehouse"
    }
  }, [warehouseId]);

  const handleFilterChange = (filters: { warehouse?: number | null; sortDirection?: string }) => {
    setSelectedWarehouse(filters.warehouse ?? null);
    setSortDirection(filters.sortDirection || sortDirection);

    const params = new URLSearchParams();
    if (filters.warehouse) params.set("warehouse", String(filters.warehouse));
    if (filters.sortDirection && filters.sortDirection !== "asc") {
      params.set("sort", filters.sortDirection);
    }
    if (searchQuery) params.set("search", searchQuery);

    if (!searchParams.has("page")) {
      params.set("page", String(currentPage));
    }

    router.push(`/dashboard/admin/stocks?${params.toString()}`);
  };

  const refreshStocks = () => {
    refetch();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 justify-center">
        <h2 className="text-2xl md:text-4xl text-center font-semibold text-gray-800 mb-6 md:mb-0">
          📦 Stock Management
        </h2>
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <button
            className="bg-blue-500 text-xl text-white px-2 py-2 rounded w-2/3 md:w-48"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Stock
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <StockFilter
            currentSortDirection={sortDirection}
            currentWarehouse={selectedWarehouse}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full md:w-1/2 flex md:justify-end">
          <Suspense fallback={<div>Loading Stocks Management...</div>}>
            <SearchBar basePath="/dashboard/admin/stocks" />
          </Suspense>
        </div>
      </div>

      {/* ⬇️ Show message if no warehouse is selected */}
      {selectedWarehouse === null ? (
        <div className="text-center text-gray-500 mt-6">
          Please choose your warehouse
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <StockItemSkeleton key={index} />)
          ) : (data?.content ?? []).length > 0 ? (
            (data?.content ?? []).map((stock: Stock) => (
              <StockItem 
                key={stock.stockId}
                stock={stock}
                onEdit={() => {
                  setEditingStock(stock);
                  setIsModalOpen(true);
                }}
              />
            ))
          ) : (
            !isLoading && (
              <div className="text-center text-gray-500 mt-4">
                {searchQuery ? `No stocks found for "${searchQuery}"` : "No stocks available"}
              </div>
            )
          )}
        </div>
      )}

      {/* ⬇️ Hide pagination when no warehouse is selected */}
      {selectedWarehouse !== null && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          basePath={"/dashboard/admin/stocks"}
        />
      )}

      <AdjustStockModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={editingStock}
        warehouseId={selectedWarehouse ?? editingStock?.warehouseId ?? null}
        onRefresh={refreshStocks}
      />

      <CreateStockModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onRefresh={refreshStocks}
      />
    </div>
  );
};

export default StockTable;