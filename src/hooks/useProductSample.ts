"use client"; // Add this at the top

import { useState, useEffect } from "react";

interface Product {
  productId: number;
  productName: string;
  detail: string;
  price: number;
  weight: number;
  totalStock: number;
  productCategory: string;
  productPictures: { productPictureUrl: string; position: number } | null;
}

interface ApiResponse {
  content: Product[];
  totalPages: number;
  number: number;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${currentPage - 1}`);
        const data: ApiResponse = await response.json();
        setProducts(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return { products, currentPage, setCurrentPage, totalPages, loading };
};

export default useProducts;