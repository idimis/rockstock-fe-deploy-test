"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/product";

const ProductCategories = () => {
  const router = useRouter();
  const { data: categoryData } = useCategories(1, 20);
  const categories: Category[] = useMemo(() => categoryData?.content ?? [], [categoryData]);

  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(2);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const scroll = useCallback(
    (dir: "left" | "right") => {
      if (categories.length <= itemsPerPage) return;
      setDirection(dir);

      setIndex((prevIndex) =>
        dir === "right"
          ? (prevIndex + itemsPerPage) % categories.length
          : (prevIndex - itemsPerPage + categories.length) % categories.length
      );
    },
    [categories, itemsPerPage]
  );

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };

  return (
    <section className="max-w-[1080px] mx-auto py-8 mb-8">
      <h2 className="text-2xl md:text-4xl text-gray-800 font-bold text-center mb-12">
        Featured Categories
      </h2>

      <div className="relative flex items-center justify-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 md:left-0 bg-black text-white px-3 py-3 md:px-4 md:py-4 rounded-full shadow-md hover:bg-gray-700 z-10"
        >
          &#8249;
        </button>

        <div className="overflow-hidden w-full max-w-6xl relative px-4 md:px-0">
          <motion.div
            key={index}
            initial={{ x: direction === "right" ? "20%" : "-20%" }}
            animate={{ x: "0%" }}
            exit={{ x: direction === "right" ? "-20%" : "20%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex gap-4 md:gap-6 justify-center w-full"
          >
            {categories.length > 0 &&
              [...categories, ...categories]
                .slice(index, index + itemsPerPage)
                .map((category, i) => (
                  <div
                    key={category.categoryId || i}
                    className="relative w-[45%] md:w-[22%] h-48 md:h-72 rounded-lg overflow-hidden shadow-md flex-shrink-0"
                  >
                    <Image
                      src={category.categoryPicture || "/placeholder.jpg"}
                      alt={category.categoryName}
                      layout="fill"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex pb-4 md:pb-6 items-end justify-center">
                      <button
                        onClick={() => handleCategoryClick(category.categoryId)}
                        className="text-gray-900 text-xs md:text-lg font-semibold bg-white min-w-[100px] md:min-w-[150px] h-8 md:h-10 flex items-center justify-center px-3 md:px-4 py-1 md:py-2 rounded-full transition-all hover:bg-black hover:text-white"
                      >
                        {category.categoryName}
                      </button>
                    </div>
                  </div>
                ))}
          </motion.div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 md:right-0 bg-black text-white px-3 py-3 md:px-4 md:py-4 rounded-full shadow-md hover:bg-gray-700 z-10"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default ProductCategories;