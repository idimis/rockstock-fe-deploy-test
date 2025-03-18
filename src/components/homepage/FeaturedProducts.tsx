'use client';

import Link from "next/link";
import Image from "next/image";

// Dummy featured products data
const featuredProducts = [
  {
    name: "Gothic Chair",
    description: "A comfortable chair with dark, gothic aesthetics.",
    price: "$199.99",
    imageUrl: "/images/gothic-chair.jpg",
    slug: "gothic-chair",
  },
  {
    name: "Dark Academia Bookshelf",
    description: "A stylish bookshelf perfect for your dark academia collection.",
    price: "$249.99",
    imageUrl: "/images/dark-academia-bookshelf.jpg",
    slug: "dark-academia-bookshelf",
  },
  {
    name: "Emo Sofa",
    description: "The ultimate emo-inspired sofa for your living room.",
    price: "$399.99",
    imageUrl: "/images/emo-sofa.jpg",
    slug: "emo-sofa",
  },
  {
    name: "Slow-rock Coffee Table",
    description: "A unique coffee table to add a touch of personality to your space.",
    price: "$149.99",
    imageUrl: "/images/alternative-coffee-table.jpg",
    slug: "alternative-coffee-table",
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12 my-8">
      <h2 className="text-3xl font-bold text-center mb-8 font-rocksalt">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.slug}
            className="relative border rounded-lg shadow-lg overflow-hidden group"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={320}
              height={320}
              className="object-cover w-full h-56 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-black">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl font-bold text-black mt-2">{product.price}</p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-black transition"
              >
                View Product
              </Link>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <span className="text-xl font-semibold">Click to Explore</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
