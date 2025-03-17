"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getAccessToken } from "@/lib/utils/auth";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { decodeToken } from "@/lib/utils/decodeToken";
import { fetchWarehouses, fetchWHAdminWarehouses } from "@/services/warehouseService";

interface Warehouse {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface SalesData {
  productName: string;
  totalSales: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SalesReport = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
    warehouseId: "all",
    productCategoryId: "all",
    productId: "all",
  });
  const accessToken = getAccessToken();
  const decoded = accessToken ? decodeToken(accessToken) : null;

  useEffect(() => {
    if (decoded?.roles === "Super Admin") {
      fetchWarehouses()
      .then(({ warehouses }) => setWarehouses(warehouses))
      .catch(() => console.error("Failed to fetch warehouses"));
    }
    if (decoded?.roles === "Warehouse Admin") {
      fetchWHAdminWarehouses()
      .then(({ warehouses }) => setWarehouses(warehouses))
      .catch(() => console.error("Failed to fetch warehouses"));
    }
  }, [decoded?.roles]);

  // const fetchWarehouses = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/warehouses`);
  //     if (Array.isArray(response.data)) {
  //       setWarehouses(response.data);
  //     } else {
  //       console.error("Unexpected response format for product categories:", response.data);
  //       setWarehouses([]);
  //     }
  //     setWarehouses(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch warehouses");
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/all`);
      if (Array.isArray(response.data?.data)) {
        setCategories(response.data?.data);
      } else {
        console.error("Unexpected response format for product categories:", response.data?.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/all`); 
      if (Array.isArray(response.data?.data)) {
        setProducts(response.data?.data);
      } else {
        console.error("Unexpected response format for products:", response.data?.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]);
    }
  };

  const aggregateSalesData = (data: SalesData[]) => {
    const aggregated: Record<string, number> = {};

    data.forEach(({ productName, totalSales }) => {
      aggregated[productName] = (aggregated[productName] || 0) + totalSales;
    });

    return Object.entries(aggregated).map(([productName, totalSales]) => ({
      productName,
      totalSales,
    }));
  };

  const fetchSalesReport = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/sales`, {
        params: filters,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const aggregatedData = aggregateSalesData(response.data || []);
      setData(aggregatedData);
    } catch (error) {
      console.error("Failed to fetch sales report", error);
    }
  }, [filters, accessToken]);

  useEffect(() => {
    fetchWarehouses();
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchSalesReport();
  }, [fetchSalesReport]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => handleFilterChange("year", value)} defaultValue={filters.year}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {[2023, 2024, 2025].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleFilterChange("month", value)} defaultValue={filters.month}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.warehouseId} onValueChange={(value) => handleFilterChange("warehouseId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                {warehouses.map((wh) => (
                  <SelectItem key={wh.id} value={wh.id.toString()}>
                    {wh.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filters.productCategoryId} onValueChange={(value) => handleFilterChange("productCategoryId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Product Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.productId} onValueChange={(value) => handleFilterChange("productId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {products?.map((prod) => (
                  <SelectItem key={prod.id} value={prod.id.toString()}>
                    {prod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-4" onClick={fetchSalesReport}>
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalSales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesReport;
