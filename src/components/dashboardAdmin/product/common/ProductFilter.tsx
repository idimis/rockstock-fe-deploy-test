"use client";

import { Category } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Select from "react-select";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const ProductFilter = ({
  currentSortField,
  currentSortDirection,
  currentCategory,
  handleFilterChange,
}: {
  currentSortField: string;
  currentSortDirection: string;
  currentCategory?: number | null;
  handleFilterChange: (filters: { category: number | null; sortField?: string; sortDirection?: string }) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.data.content);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  
  const categoryOptions = [
    { value: null, label: "All Categories" },
    ...categories.map((category) => ({
      value: category.categoryId,
      label: category.categoryName,
    })),
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-2 gap-4 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 w-full gap-4">
        <div className="relative w-full md:w-64">
          <Select
            options={categoryOptions}
            className="text-gray-500"
            placeholder="All Categories"
            isSearchable
            value={categoryOptions.find((c) => c.value === currentCategory) || categoryOptions[0]}
            onChange={(selectedOption) => {
              handleFilterChange({
                category: selectedOption?.value ?? null,
                sortField: "name",
                sortDirection: "asc",
              });
            }}
          />
        </div>
  
        <div className="relative w-full md:w-64">
          <Select
            options={[
              { value: "name", label: "Sort by Name" },
              { value: "price", label: "Sort by Price" },
            ]}
            className="text-gray-500"
            placeholder="Sort by"
            isSearchable={false}
            value={
              currentSortField
                ? { value: currentSortField, label: `Sort by ${currentSortField.charAt(0).toUpperCase() + currentSortField.slice(1)}` }
                : null
            }
            onChange={(selectedOption) => {
              handleFilterChange({
                sortField: selectedOption?.value || "name",
                sortDirection: "asc",
                category: currentCategory ?? null,
              });
            }}
          />
        </div>
  
        <div className="flex space-x-2 md:ml-2 w-full md:w-auto justify-end">
          <button
            onClick={() =>
              handleFilterChange({
                sortDirection: "asc",
                category: currentCategory ?? null,
              })
            }
            className={`p-1 rounded transition ${
              currentSortDirection === "asc" ? "bg-gray-400 text-white" : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            <AiOutlineArrowUp className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              handleFilterChange({
                sortDirection: "desc",
                category: currentCategory ?? null,
              })
            }
            className={`p-1 rounded transition ${
              currentSortDirection === "desc" ? "bg-gray-400 text-white" : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            <AiOutlineArrowDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;