"use client";

import { useParams } from "next/navigation";
import useProductDetail from "@/hooks/useProductDetail";
import ImageCarousel from "@/components/products/ImageCarousel";
import QuantitySelector from "@/components/products/QuantitySelector";
import Navbar from "@/components/common/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  
  const { product, loading } = useProductDetail(Number(id));

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <><Navbar />
    <div className="flex space-x-8 p-8">
      {/* Left: Image */}
      <div className="w-1/3 text-gray-600">
        {product.productPictures.length > 0 ? <ImageCarousel images={product.productPictures} /> : <p>No images available</p>}
      </div>

      {/* Middle: Details */}
      <div className="w-1/3">
        <h1 className="text-gray-600 text-2xl font-bold">{product.productName}</h1>
        <p className="text-green-600 text-xl font-semibold">Rp. {product.price.toLocaleString("id-ID")}</p>
        <p className="text-gray-700 mt-2">{product.detail}</p>
        <p className="text-gray-500 mt-1">Weight: {product.weight} kg</p>
      </div>

      {/* Right: Stock Selection */}
      <div className="w-1/3">
      <QuantitySelector productId={product.productId} totalStock={product.totalStock} price={product.price} />

      </div>
    </div></>
  );
};

export default ProductDetail;