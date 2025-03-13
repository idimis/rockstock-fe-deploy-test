"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import FullSkeleton from "@/components/dashboardAdmin/product/common/FullSkeleton";
import { Product } from "@/types/product";
import ProductsPage from "@/components/products/ProductsPage";
import ProductsFilter from "@/components/products/ProductFilter";
import ProductsItem from "@/components/products/ProductsItem";

const ProductsCust = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") ? Number(searchParams.get("category")) : null;
  const sortField = searchParams.get("sortField") || "name";
  const sortDirection = searchParams.get("sort") || "asc";
  const pageSize = 12;

  const { data, isLoading } = useProducts(currentPage, pageSize, searchQuery, categoryId !== null ? categoryId : undefined, sortField, sortDirection);

  const updateQueryParams = (params: Record<string, string | number | null | undefined>) => {
    const query = new URLSearchParams(searchParams.toString());
  
    Object.entries(params).forEach(([key, value]) => {
      if (key === "category" && value == null) {
        query.delete("sortField");
        query.delete("sort");
      }
  
      if (
        value === null || 
        value === "" ||
        (key === "page" && value === 1) ||
        (key === "sortField" && value === "name") || // Remove sortField=name always
        (key === "sort" && value === "asc") // Remove sort=asc always
      ) {
        query.delete(key);
      } else {
        query.set(key, String(value));
      }
    });
  
    router.push(`/products?${query.toString()}`);
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
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between justify-center">
        <h2 className="text-xl md:text-4xl font-semibold text-gray-800 mb-4 md:mb-0 text-center md:text-left"></h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <ProductsFilter
            currentSortField={sortField}
            currentSortDirection={sortDirection}
            currentCategory={categoryId}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => <FullSkeleton key={index} />)
        ) : (
          (data?.content ?? []).length > 0 ? (
            (data?.content ?? []).map((product: Product) => (
              <ProductsItem key={product.productId} product={product}/>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              {searchQuery ? `No products found for "${searchQuery}"` : "No products available"}
            </div>
          )
        )}
      </div>

      <ProductsPage
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
        basePath={"/products"}
      />
    </div>
  );
};

export default ProductsCust;