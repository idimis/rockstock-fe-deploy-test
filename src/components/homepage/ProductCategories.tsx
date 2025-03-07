import React from "react";
import Link from "next/link";
import Image from "next/image";

// Dummy category data
const categories = [
  {
    name: "Emo Vibes",
    slug: "emo-vibes",
    description:
      "Furniture inspired by the raw emotional energy of emo aesthetics.",
    icon: "/icons/emo-vibes.png",
  },
  {
    name: "Dark Academia",
    slug: "dark-academia",
    description:
      "Timeless, scholarly pieces with a dark, intellectual vibe.",
    icon: "/icons/dark-academia.png",
  },
  
  {
    name: "Gothic Minimalism",
    slug: "gothic-minimalism",
    description: "Sleek, dark, and simple minimalistic designs.",
    icon: "/icons/gothic-minimalism.png",
  },
  {
    name: "Victorian Revival",
    slug: "victorian-revival",
    description: "Bring back the elegance and opulence of the Victorian era.",
    icon: "/icons/victorian-revival.png",
  },
  {
    name: "Metal Aesthetic",
    slug: "metal-aesthetic",
    description: "Furniture with an industrial, gritty edge.",
    icon: "/icons/metal-aesthetic.png",
  },
  

  {
    name: "Steampunk Charm",
    slug: "steampunk-charm",
    description: "A mix of Victorian and industrial steampunk style.",
    icon: "/icons/steampunk-charm.png",
  },
];

const CategorySection: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-8 py-12 my-8">
      <h2 className="text-3xl font-semibold text-center text-black mb-8">
        Featured Categories
      </h2>

      <div className="relative">
        <div className="flex items-center space-x-4 absolute inset-0 justify-between z-10">
          <button
            onClick={scrollLeft}
            className="bg-black text-white p-4 rounded-full shadow-md hover:bg-gray-700 transition"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="bg-black text-white p-4 rounded-full shadow-md hover:bg-gray-700 transition"
          >
            &gt;
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto flex gap-6 p-6 scroll-smooth"
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              className="relative border rounded-lg shadow-lg overflow-hidden group w-[300px] h-[400px] bg-white"
            >
              <div className="relative w-full h-[60%] bg-gray-100 flex items-center justify-center">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>

              <div className="p-4 bg-white flex flex-col justify-between h-[40%]">
                <h3 className="text-lg font-semibold text-black">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                <Link
                  href={`/category/${category.slug}`}
                  className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-black transition"
                >
                  Explore {category.name}
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
    </section>
  );
};

export default CategorySection;
