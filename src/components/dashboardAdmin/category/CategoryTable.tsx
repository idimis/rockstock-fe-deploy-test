"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import SkeletonRow from "@/components/dashboardAdmin/category/SkeletonRow";
import Pagination from "@/components/dashboardAdmin/category/Pagination";
import SearchBar from "@/components/dashboardAdmin/category/SearchBar";
import { useState, useEffect } from "react";
import CategoryModal from "@/components/dashboardAdmin/category/CategoryModal";
import CategoryItem from "@/components/dashboardAdmin/category/CategoryItem";
import { Category } from "@/types/product";

const CategoryTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQueryFromURL = searchParams.get("search") || "";
  const pageSize = 10;

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

  const updatePage = (page: number) => {
    setIsFetching(true);
    window.location.href = `/dashboard/admin/categories?page=${page}&search=${searchQueryFromURL}`;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 md:mb-0">
          📦 Category Management
        </h2>
        <button 
          className="bg-blue-500 text-white px-6 py-3 text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        >
          + Create Category
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <SearchBar basePath="/dashboard/admin/categories"/>
      </div>

      <div className="space-y-4 mt-6">
        {isFetching ? (
          Array.from({ length: 10 }).map((_, index) => <SkeletonRow key={index} />)
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
        onPageChange={updatePage} 
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