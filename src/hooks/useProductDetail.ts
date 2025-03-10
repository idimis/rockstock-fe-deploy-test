import { useState, useEffect } from "react";

interface Product {
  productId: number;
  productName: string;
  detail: string;
  price: number;
  weight: number;
  totalStock: number;
  productCategory: string;
  productPictures: { productPictureUrl: string; position: number }[];
}

const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading };
};

export default useProductDetail;