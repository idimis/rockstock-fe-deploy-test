"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

const ProductCarousel = () => {
  const router = useRouter();

  const { data: productData } = useProducts(1, 4, "");
  const products: Product[] = productData?.content ?? [];

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const truncateDescription = (text: string) => {
    const words = text.split(" ");
    return words.length > 25 ? words.slice(0, 25).join(" ") + "..." : text;
  };

  return (
    <section className="w-full mx-auto py-8 mb-8">
      <h2 className="text-2xl md:text-4xl text-gray-800 font-bold text-center mb-12">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-4 md:mx-auto px-4">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white shadow-md rounded-lg overflow-hidden p-3 md:p-4"
          >
            {/* Product Image */}
            <div className="relative h-40 md:h-60 w-full">
              <Image
                src={product.productPictures?.[0]?.productPictureUrl || "/placeholder.jpg"}
                alt={product.productName}
                layout="fill"
                className="object-cover"
              />
            </div>

            <div className="pt-3 md:pt-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-lg min-h-12 md:min-h-16">
                {product.productName}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm line-clamp-2 h-[30px] md:h-[40px]">
                {truncateDescription(product.detail)}
              </p>
              <p className="text-gray-500 text-xs md:text-sm">Stock: {product.totalStock}</p>

              <button
                onClick={() => handleProductClick(product.productId)}
                className="mt-3 md:mt-4 bg-red-600 text-white w-full py-2 rounded-lg text-xs md:text-base hover:bg-red-700 transition-all"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;