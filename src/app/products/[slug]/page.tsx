"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useProductDetail from "@/hooks/useProductDetail";
import ImageCarousel from "@/components/products/ImageCarousel";
import QuantitySelector from "@/components/products/QuantitySelector";
import Navbar from "@/components/common/Navbar";

const ProductDetail = () => {
  const { slug } = useParams();
  const productId = Number(slug);
  const router = useRouter();

  const { product, loading } = useProductDetail(productId);

  useEffect(() => {
    if (!loading && !product) {
      const timer = setTimeout(() => {
        router.push("/products");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [loading, product, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!product || !product.productId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg mb-4">Product not found.</p>
        <button
          onClick={() => router.push("/products")}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go Back to Products
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start gap-12">
          <div className="flex flex-col md:flex-row gap-10 w-full md:w-4/5">
            <div className="w-full md:w-1/3 flex-shrink-0 mx-auto md:mx-0">
              {product.productPictures?.length > 0 ? (
                <ImageCarousel images={product.productPictures} />
              ) : (
                <p className="text-gray-600 text-center">No images available</p>
              )}
            </div>

            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h1 className="text-gray-600 text-2xl font-bold mb-3">{product.productName}</h1>
              <p className="text-gray-800 text-xl font-semibold mb-2">
                Rp. {product.price.toLocaleString("id-ID")}
              </p>

              <div className="text-gray-700 overflow-hidden h-36">
                <p className="text-gray-400 line-clamp-6">{product.productCategory}</p>
                <p className="line-clamp-6">{product.detail}</p>
              </div>

              <p className="text-gray-500 mt-4">
                Weight: {product.weight >= 1000 ? (product.weight / 1000) + " kg" : product.weight + " g"}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md">
              <QuantitySelector
                productId={product.productId}
                totalStock={product.totalStock}
                price={product.price}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;