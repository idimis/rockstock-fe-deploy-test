// components/NewestProducts.tsx

import Link from "next/link";
import Image from "next/image";

// Dummy new products data
const newestProducts = [
  {
    name: "Gothic Lamp",
    description: "Illuminate your room with this gothic-style lamp.",
    price: "$89.99",
    imageUrl: "/images/gothic-lamp.jpg",
    slug: "gothic-lamp",
  },
  {
    name: "Emo Mirror",
    description: "Reflect your mood with this dark, emo-inspired mirror.",
    price: "$129.99",
    imageUrl: "/images/emo-mirror.jpg",
    slug: "emo-mirror",
  },
  {
    name: "Alternative Rug",
    description: "A dark rug to complement any edgy room.",
    price: "$49.99",
    imageUrl: "/images/alternative-rug.jpg",
    slug: "alternative-rug",
  },
  {
    name: "Industrial Shelf",
    description: "A sleek, industrial shelf for your home.",
    price: "$159.99",
    imageUrl: "/images/industrial-shelf.jpg",
    slug: "industrial-shelf",
  },
];

const NewestProducts: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12 my-8">
      <h2 className="text-3xl font-bold text-center mb-8">Newest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {newestProducts.map((product) => (
          <div
            key={product.slug}
            className="relative border rounded-lg overflow-hidden group"
          >
            <Link href={`/product/${product.slug}`}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover w-full h-96 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Hover Pinpoint Popup */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm">{product.description}</p>
                <p className="text-lg font-bold mt-2">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewestProducts;
