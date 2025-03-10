"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import FullSkeleton from "@/components/dashboardAdmin/product/common/FullSkeleton";
import Pagination from "@/components/dashboardAdmin/product/common/Pagination";
import SearchBar from "@/components/dashboardAdmin/product/common/SearchBar";
import ProductFilter from "@/components/dashboardAdmin/product/common/ProductFilter";
import ProductItem from "@/components/dashboardAdmin/product/ProductItem";
import { Product } from "@/types/product";
import { useCreateDraft } from "@/hooks/useCreateDraft";

const ProductTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") ? Number(searchParams.get("category")) : null;
  const sortField = searchParams.get("sortField") || "name";
  const sortDirection = searchParams.get("sort") || "asc";
  const pageSize = 10;

  const createDraftMutation = useCreateDraft();
  const { data, isLoading } = useProducts(currentPage, pageSize, searchQuery, categoryId !== null ? categoryId : undefined, sortField, sortDirection);

  const updateQueryParams = (params: Record<string, string | number | null | undefined>) => {
    const query = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (
        value === null || 
        value === "" ||
        (key === "page" && value === 1) ||
        (key === "sortField" && value === "name" && query.get("sort") === "asc") ||
        (key === "sort" && value === "asc" && query.get("sortField") === "name")
      ) {
        query.delete(key);
      } else {
        query.set(key, String(value));
      }
    });

    router.push(`/dashboard/admin/products?${query.toString()}`);
  };

  const handleSearch = (query: string) => {
    updateQueryParams({ search: query, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateQueryParams({ page });
  };

  const handleFilterChange = (filters: { category?: number | null; sortField?: string; sortDirection?: string }) => {
    updateQueryParams({
      category: filters.category ?? null,
      sortField: filters.sortField || sortField,
      sort: filters.sortDirection || sortDirection,
      page: 1,
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 justify-center">
      <h2 className="text-xl md:text-4xl font-semibold text-gray-800 mb-4 md:mb-0 text-center md:text-left">
      🛍️ Product Management
        </h2>
        <div className="flex justify-center md:justify-end w-full md:w-auto">
        <button
          type="button"
          onClick={() => createDraftMutation.mutate()}
          className="bg-blue-500 text-xl text-white px-2 py-2 rounded w-2/3 md:w-48"
          disabled={createDraftMutation.isPending}
        >
          {createDraftMutation.isPending ? "Creating..." : "Create Product"}
        </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <ProductFilter
            currentSortField={sortField}
            currentSortDirection={sortDirection}
            currentCategory={categoryId}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          <SearchBar basePath="/dashboard/admin/products" onSearch={handleSearch} />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => <FullSkeleton key={index} />)
        ) : (
          (data?.content ?? []).length > 0 ? (
            (data?.content ?? []).map((product: Product) => (
              <ProductItem key={product.productId} product={product}/>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">
              {searchQuery ? `No products found for "${searchQuery}"` : "No products available"}
            </div>
          )
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
        basePath={"/dashboard/admin/products"}
      />
    </div>
  );
};

export default ProductTable;