"use client";

import Sidebar from "@/components/common/AdminSidebar";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useState } from "react";

const productData = [
  { id: "F-001", name: "Midnight Velvet Sofa", quantity: 3, price: "$899" },
  { id: "F-002", name: "Gothic Oak Bookshelf", quantity: 1, price: "$749" },
  { id: "F-003", name: "Victorian Candle Chandelier", quantity: 5, price: "$499" },
  { id: "F-004", name: "Dark Elegance Coffee Table", quantity: 2, price: "$399" },
];

const getStatus = (quantity: number) => {
  if (quantity > 5) return "Available";
  if (quantity > 1) return "Rare Find";
  return "Almost Extinct";
};

const AdminProduct = () => {
  const [products] = useState(productData);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navbar />
      <div className="flex flex-grow text-black">
        <Sidebar />
        <main className="flex-grow p-6 shadow-md">
          <h1 className="text-3xl font-bold mb-4">🕸️ RockStock Product Management</h1>
          <table className="w-full border border-black text-black">
            <thead>
              <tr className="bg-gray-400 text-black">
                <th className="border p-3">Product ID</th>
                <th className="border p-3">Product Name</th>
                <th className="border p-3">Stock Quantity</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-200">
                  <td className="border p-3">{product.id}</td>
                  <td className="border p-3 font-semibold text-black">{product.name}</td>
                  <td className="border p-3">{product.quantity} pcs</td>
                  <td className="border p-3 font-semibold text-black">{product.price}</td>
                  <td
                    className={`border p-3 font-semibold ${
                      product.quantity > 5
                        ? "text-green-500"
                        : product.quantity > 1
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {getStatus(product.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProduct;
