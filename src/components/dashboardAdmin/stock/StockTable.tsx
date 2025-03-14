"use client";

import { useSearchParams } from "next/navigation";
import { useStocks } from "@/hooks/useStocks";
import SkeletonRow from "@/components/dashboardAdmin/category/SkeletonRow";
import Pagination from "@/components/dashboardAdmin/Pagination";
import SearchBar from "@/components/dashboardAdmin/SearchBar";
import { useState, useEffect, Suspense } from "react";
import StockModal from "@/components/dashboardAdmin/stock/StockModal";
import StockItem from "@/components/dashboardAdmin/stock/StockItem";
import { Stock } from "@/types/stock";

const StockTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const pageSize = 10;

  const [isFetching, setIsFetching] = useState(true);
  const { data, isLoading } = useStocks(currentPage, pageSize, searchQuery);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingStock, setEditingStock] = useState<Stock | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFetching(false);
    }, 1000);

    if (!isLoading) {
      setIsFetching(false);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const updatePage = (page: number) => {
    setIsFetching(true);
    window.location.href = `/dashboard/admin/stocks?page=${page}&search=${searchQuery}`;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl md:text-4xl text-center font-semibold text-gray-800 mb-6 md:mb-0">
          📦 Stock Management
        </h2>
        <div className="flex justify-center md:justify-end w-full md:w-auto">
        <button 
          className="bg-blue-500 text-xl text-white px-2 py-2 rounded w-2/3 md:w-48"
          // onClick={() => {
          //   setEditingStock(null);
          //   setIsModalOpen(true);
          // }}
        >
          Create Stock
        </button>
        </div>
      </div>

      <div className="w-full md:w-auto flex md:justify-end">
        <Suspense fallback={<div>Loading Stock Management...</div>}>
          <SearchBar basePath="/dashboard/admin/stocks"/>
        </Suspense>
      </div>

      <div className="space-y-4 mt-6">
        {isFetching ? (
          Array.from({ length: 10 }).map((_, index) => <SkeletonRow key={index} />)
        ) : (data?.content ?? []).length > 0 ? (
          (data?.content ?? []).map((stock: Stock) => (
            <StockItem 
              key={stock.stockId}
              stock={stock}
              // onEdit={() => {
              //   setEditingStock(stock);
              //   setIsModalOpen(true);
              // }}
            />
          ))
        ) : (
          !isFetching && (
            <div className="text-center text-gray-500 mt-4">
              {searchQuery ? `No categories found for "${searchQuery}"` : "No categories available"}
            </div>
          )
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={updatePage} 
        basePath={"/dashboard/admin/stocks"}
      />

      {/* <StockModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={editingStock}
      /> */}
    </div>
  );
};

export default StockTable;