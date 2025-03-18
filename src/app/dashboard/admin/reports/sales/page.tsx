"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, ComposedChart, CartesianGrid } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAccessToken } from "@/lib/utils/auth";

type Warehouse = {
  id: number;
  name: string;
};

type Product = {
  productId: number;
  productName: string;
};

type Category = {
  categoryId: number;
  categoryName: string;
};

type ReportEntry = {
  month: string;
  totalSales: number;
  totalQuantity: number;
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const SalesReport = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [warehouseId, setWarehouseId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [productCategoryId, setProductCategoryId] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reportData, setReportData] = useState<ReportEntry[]>([]);

  const fetchReport = async () => {
    const accessToken = getAccessToken();
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/monthly`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year, warehouseId, productId, productCategoryId },
      });
  
      const aggregatedData = response.data.reduce((acc: Record<string, ReportEntry>, entry: ReportEntry) => {
        if (!acc[entry.month]) {
          acc[entry.month] = { ...entry };
        } else {
          acc[entry.month].totalSales += entry.totalSales;
          acc[entry.month].totalQuantity += entry.totalQuantity;
        }
        return acc;
      }, {});
  
      setReportData(Object.values(aggregatedData));
    } catch (error) {
      console.error("Error fetching report:", error);
      setReportData([]);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses`);
      if (Array.isArray(response.data)) {
        setWarehouses(response.data);
      } else {
        setWarehouses([]);
      }
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/all`);
      console.log("Response Product: ", response.data);
      
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/all`);
      console.log("Response Category: ", response.data);
  
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Data received is not an array:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };
  

  useEffect(() => {
    fetchReport();
  }, [year, warehouseId, productId, productCategoryId]);

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
    fetchCategories(); 
  }, []);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold">Sales Report</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Select value={year.toString()} onValueChange={(val) => setYear(parseInt(val))}>
          <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
          <SelectContent>
            {[...Array(5)].map((_, i) => {
              const y = new Date().getFullYear() - i;
              return <SelectItem key={y} value={y.toString()}>{y}</SelectItem>;
            })}
          </SelectContent>
        </Select>
        
        <Select value={warehouseId ?? "all"} onValueChange={(val) => setWarehouseId(val === "all" ? null : val)}>
          <SelectTrigger><SelectValue placeholder="Select Warehouse" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {warehouses.map((wh) => (
              <SelectItem key={wh.id} value={wh.id.toString()}>{wh.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={productId ?? "all"} onValueChange={(val) => setProductId(val === "all" ? null : val)}>
          <SelectTrigger><SelectValue placeholder="Select Product" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {products.map((prod) => (
              <SelectItem key={prod.productId} value={prod.productId.toString()}>{prod.productName}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={productCategoryId ?? "all"} onValueChange={(val) => setProductCategoryId(val === "all" ? null : val)}>
          <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.categoryId} value={cat.categoryId.toString()}>{cat.categoryName}</SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>
      <CardContent>
        {reportData.length ? (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={reportData.map(d => ({ ...d, month: monthNames[parseInt(d.month) - 1] }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left" 
                tickFormatter={(value) => value.toLocaleString()} 
                allowDecimals={false} 
                width={100}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => value.toLocaleString()} 
                allowDecimals={false} 
              />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="totalSales" 
                fill="#ff0000" 
                name="Total Sales" 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="totalQuantity" 
                stroke="#0000ff" 
                strokeWidth={3} 
                name="Total Quantity" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesReport;
