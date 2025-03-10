"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <div className="text-8xl sm:text-9xl text-red-600 font-bold">401</div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mt-2">
          Unauthorized
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-2">
          You don&apos;t have permission to access this page.
        </p>
        <p className="text-gray-500 mt-1">Redirecting to homepage...</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;