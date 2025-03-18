"use client";

import { useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import SkeletonRow from "@/components/dashboardAdmin/category/SkeletonRow";
import Pagination from "@/components/dashboardAdmin/Pagination";
import SearchBar from "@/components/dashboardAdmin/category/SearchBar";
import { useState, useEffect, Suspense } from "react";
import CategoryModal from "@/components/dashboardAdmin/category/CategoryModal";
import CategoryItem from "@/components/dashboardAdmin/category/CategoryItem";
import { Category } from "@/types/product";

const CategoryTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQueryFromURL = searchParams.get("search") || "";
  const pageSize = 8;

  const [isFetching, setIsFetching] = useState(true);
  const { data, isLoading } = useCategories(currentPage, pageSize, searchQueryFromURL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl md:text-4xl text-center font-semibold text-gray-800 mb-6 md:mb-0">
          📦 Category Management
        </h2>
        <div className="flex justify-center md:justify-end w-full md:w-auto">
        <button 
          className="bg-blue-500 text-xl text-white px-2 py-2 rounded w-2/3 md:w-48"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        >
          Create Category
        </button>
        </div>
      </div>

      <div className="w-full md:w-full flex md:justify-end">
        <Suspense fallback={<div>Loading Category Management...</div>}>
          <SearchBar basePath="/dashboard/admin/categories"/>
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {isFetching ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonRow key={index} />)
        ) : (data?.content ?? []).length > 0 ? (
          (data?.content ?? []).map((category: Category) => (
            <CategoryItem 
              key={category.categoryId}
              category={category}
              onEdit={() => {
                setEditingCategory(category);
                setIsModalOpen(true);
              }}
            />
          ))
        ) : (
          !isFetching && (
            <div className="text-center text-gray-500 mt-4">
              {searchQueryFromURL ? `No categories found for "${searchQueryFromURL}"` : "No categories available"}
            </div>
          )
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        basePath={"/dashboard/admin/categories"}
      />

      <CategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
      />
    </div>
  );
};

export default CategoryTable;