"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import darkfurnitureImage from "@/public/darkfurniture.jpeg";
import Footer from "@/components/common/Footer";

const Logout: React.FC = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // Hapus semua data terkait user
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    localStorage.removeItem("fullname");
    localStorage.removeItem("is_verified");

    if (session) {
          
      signOut({ callbackUrl: "/" });
    } else {
      
      window.location.href = "/";
    }
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen bg-light-gray">
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="relative w-full lg:w-1/2">
          <Image
            src={darkfurnitureImage}
            alt="Logout Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
            Thank You for Visiting!
          </h1>
          <p className="text-xl text-center text-gray-700 mb-4">
            We hope to see you again soon. Your session has been logged out.
          </p>
          <p className="text-center text-gray-500">
            You will be redirected shortly, or you can{" "}
            <Link href="/" className="text-blue-600 underline">click here</Link> to return home.
          </p>

          <div className="text-center mt-8">
            <p className="text-gray-600">Take care and stay tuned for future visits!</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Logout;
