"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Gunakan useState untuk menyimpan token agar tidak error saat pre-rendering
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const tokenFromParams = searchParams.get("token");

    if (!tokenFromParams) {
      setStatus("error");
      return;
    }

    setToken(tokenFromParams); // Simpan token di state

    const verifyEmail = async () => {
      console.log("Verifying token:", tokenFromParams);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-email?token=${tokenFromParams}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          console.error("Response not OK:", response);
          throw new Error("Invalid or expired token");
        }

        const data = await response.json();
        console.log("Server response:", data);

        setStatus("success");
        setTimeout(() => router.push(`/auth/setup-password?token=${tokenFromParams}`), 2000);
      } catch (error) {
        console.error("Error during verification:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "loading" && <p className="text-gray-600">Verifying your email...</p>}
      {status === "success" && (
        <div>
          <p className="text-green-600 font-semibold">Email verified! Redirecting to password setup...</p>
          {token && (
            <button
              onClick={() => router.push(`/auth/setup-password?token=${token}`)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Set Password
            </button>
          )}
        </div>
      )}
      {status === "error" && (
        <p className="text-red-500 font-semibold">Verification failed. The link may be expired or invalid.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
