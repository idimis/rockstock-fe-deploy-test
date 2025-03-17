"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatStatus } from "@/lib/utils/format";
import { statusColors } from "@/constants/statusColors";
import { OrderFilterProps } from "@/types/order";
import { getAccessToken } from "@/lib/utils/auth";
import { decodeToken } from "@/lib/utils/decodeToken";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const OrderFilter: React.FC<OrderFilterProps> = ({ filters, setFilters, setPage, warehouses }) => {
  const router = useRouter();  
  const accessToken = getAccessToken();
  const decode = accessToken ? decodeToken(accessToken) : null;
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(filters.startDate || "");
  const [tempEndDate, setTempEndDate] = useState(filters.endDate || "");
  
  // Function to update the URL with filter params
  const updateUrl = (updatedFilters: typeof filters) => {
    const queryParams = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        queryParams.set(key, String(value));
      }
    });

    router.push(`?${queryParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  // Initialize filters from URL parameters when the component mounts
  useEffect(() => {
    if (!searchParams) return; // Prevent running before state is set
  
    const sortOrderValue = searchParams.get("sortOrder");
    const validatedSortOrder: "asc" | "desc" | null =
      sortOrderValue === "asc" || sortOrderValue === "desc" ? sortOrderValue : "desc";
  
    const initialFilters = {
      status: searchParams.get("status") || null,
      warehouseId: searchParams.get("warehouseId") || null,
      startDate: searchParams.get("startDate") || null,
      endDate: searchParams.get("endDate") || null,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: validatedSortOrder,
    };
  
    setFilters(initialFilters);
    setTempStartDate(initialFilters.startDate || "");
    setTempEndDate(initialFilters.endDate || "");
  }, [searchParams, setFilters]);
  
  // Handle filter change
  const handleFilterChange = (key: keyof typeof filters, value: string | null) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    setPage(1);
    updateUrl(updatedFilters);
  };

  // Apply date filter
  const applyDateFilter = () => {
    const updatedFilters = { ...filters, startDate: tempStartDate || null, endDate: tempEndDate || null };
    setFilters(updatedFilters);
    setShowDateFilter(false);
    setPage(1);
    updateUrl(updatedFilters);
  };

  // Reset all filters
  const resetFilters = () => {
    const defaultFilters: typeof filters = {
      status: null,
      warehouseId: null,
      startDate: null,
      endDate: null,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    setFilters(defaultFilters);
    setPage(1);
    updateUrl(defaultFilters);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-lg bg-white shadow">
      <div className="flex flex-col items-center gap-2 md:flex-row">
        {/* Warehouse Filter */}
        {decode?.roles?.[0] !== "Customer" && (
          <select
            onChange={(e) => handleFilterChange("warehouseId", e.target.value === "ALL_WAREHOUSES" ? null : e.target.value)}
            value={filters.warehouseId || "ALL_WAREHOUSES"}
            className="w-full py-2 px-4 bg-white border rounded-md shadow"
          >
            <option value="ALL_WAREHOUSES">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        )}
        
        {/* Status Filter */}
        <select
          onChange={(e) => handleFilterChange("status", e.target.value === "ALL_STATUS" ? null : e.target.value)}
          value={filters.status || "ALL_STATUS"}
          className="w-full py-2 px-4 bg-white border rounded-md shadow"
        >
          <option value="ALL_STATUS">All Status</option>
          {Object.keys(statusColors).map((status) => (
            <option key={status} value={status}>
              {formatStatus(status)}
            </option>
          ))}
        </select>

        {/* Date Filter Button */}
        <button
          onClick={() => setShowDateFilter(!showDateFilter)}
          className="w-full p-1.5 px-4 bg-white text-black rounded-md border shadow hover:bg-gray-200"
        >
          Select Date Range
        </button>
      </div>

      {showDateFilter && (
        <div className="p-4 bg-white border rounded-md shadow flex flex-col gap-2">
          <label className="text-sm font-semibold">Start Date</label>
          <input
            type="date"
            value={tempStartDate}
            onChange={(e) => setTempStartDate(e.target.value)}
            className="p-2 bg-white border rounded-md shadow"
          />
          <label className="text-sm font-semibold">End Date</label>
          <input
            type="date"
            value={tempEndDate}
            onChange={(e) => setTempEndDate(e.target.value)}
            className="p-2 bg-white border rounded-md shadow"
          />
          <button
            onClick={applyDateFilter}
            className="mt-2 p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            Apply Filter
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Sorting Filter */}
        <div className="flex gap-1 items-center">
          <label className="text-sm font-semibold">Sort By</label>
          <select
            onChange={(e) => handleFilterChange("sortBy", e.target.value || null)}
            value={filters.sortBy || "createdAt"}
            className="p-2 bg-white border rounded-md shadow"
          >
            <option value="createdAt">Date</option>
            <option value="totalPayment">Total Payment</option>
          </select>

          {filters.sortBy && (
            <button
              onClick={() => handleFilterChange("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2 p-2 bg-white border rounded-md shadow hover:bg-gray-200"
            >
              {filters.sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
            </button>
          )}
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={resetFilters}
          className="py-2 px-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;