
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Review {
  productName: string;
  fullname: string;
  rating: number;
  review: string;
  photoProfileUrl?: string;
  userId: string | number;
  role: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ReviewPopup: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/reviews`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const text = await response.text();
        if (!text) {
          console.warn("Empty response from server");
          setReviews([]);
          return;
        }
        
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.warn("Unexpected response format:", data);
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    
    fetchReviews();
  }, []);

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="relative">
      <div className="py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Product Reviews</h2>
        <div className="flex flex-col items-center md:flex-row flex-wrap justify-center">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm mb-6 md:mb-0 md:mr-6 cursor-pointer"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={animationVariants}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <Link href={`/user/profile/${review.userId}`} className="block h-full">
                  <div className="flex items-center mb-4">
                    {review.photoProfileUrl ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={review.photoProfileUrl}
                          alt={`${review.fullname} Profile`}
                          width={48}  
                          height={48} 
                          className="object-cover w-full h-full"
                        />

                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center text-xl font-semibold text-gray-600">
                        {review.fullname[0]}
                      </div>
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{review.fullname}</p>
                      <p className="text-xs text-gray-500">{review.productName} - {review.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic mb-3">&quot;{review.review}&quot;</p>
                  <p className="text-yellow-500 text-sm font-bold">Rating: {review.rating} / 5</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;