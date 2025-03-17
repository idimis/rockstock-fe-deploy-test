"use client";

import { useState } from "react";

const stockData = [
  { id: "S-001", name: "Gothic Throne Chair", quantity: 12 },
  { id: "S-002", name: "Victorian Velvet Sofa", quantity: 5 },
  { id: "S-003", name: "Baroque Coffee Table", quantity: 8 },
  { id: "S-004", name: "Dark Oak Bookshelf", quantity: 3 },
];

const getStatus = (quantity: number) => {
  if (quantity > 10) return "Available";
  if (quantity > 3) return "Low Stock";
  return "Out of Stock";
};

const AdminStock = () => {
  const [stocks, setStocks] = useState(stockData);

  const restockProduct = (id: string) => {
    setStocks(
      stocks.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 5 } : item
      )
    );
  };

  return (
    <main className="flex-grow p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">📦 Stock Management</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Stock ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Stock Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.quantity} units</td>
              <td
                className={`border p-2 font-semibold ${
                  product.quantity > 10
                    ? "text-green-600"
                    : product.quantity > 3
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {getStatus(product.quantity)}
              </td>
              <td className="border p-2">
                {product.quantity <= 10 && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => restockProduct(product.id)}
                  >
                    Restock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default AdminStock;
