"use client";

import { useState } from "react";

const dummySalesReport = [
  { month: "July", category: "Chairs", product: "Gothic Throne Chair", sales: 15, warehouse: "Main Warehouse" },
  { month: "July", category: "Sofas", product: "Victorian Velvet Sofa", sales: 8, warehouse: "Main Warehouse" },
  { month: "July", category: "Tables", product: "Baroque Coffee Table", sales: 10, warehouse: "Warehouse B" },
];

const dummyStockReport = [
  { month: "July", product: "Dark Oak Bookshelf", added: 20, removed: 5, finalStock: 15, warehouse: "Main Warehouse" },
  { month: "July", product: "Gothic Throne Chair", added: 10, removed: 3, finalStock: 7, warehouse: "Warehouse B" },
];

const AdminReports = () => {
  const [salesReport] = useState(dummySalesReport);
  const [stockReport] = useState(dummyStockReport);

  return (
    <main className="flex-grow p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">📊 Reports & Analysis</h1>

      {/* Sales Report */}
      <h2 className="text-xl font-semibold mb-2">Sales Report</h2>
      <table className="w-full border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Month</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Sales</th>
            <th className="border p-2">Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {salesReport.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.month}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.product}</td>
              <td className="border p-2">{item.sales}</td>
              <td className="border p-2">{item.warehouse}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stock Report */}
      <h2 className="text-xl font-semibold mb-2">Stock Report</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Month</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Added</th>
            <th className="border p-2">Removed</th>
            <th className="border p-2">Final Stock</th>
            <th className="border p-2">Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {stockReport.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.month}</td>
              <td className="border p-2">{item.product}</td>
              <td className="border p-2">{item.added}</td>
              <td className="border p-2">{item.removed}</td>
              <td className="border p-2">{item.finalStock}</td>
              <td className="border p-2">{item.warehouse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default AdminReports;
