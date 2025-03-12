"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tokenFromParams = searchParams.get("token");

    if (!tokenFromParams) {
      setStatus("error");
      return;
    }

    setToken(tokenFromParams);

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/auth/verify-email?token=${tokenFromParams}`
        );

        if (!response.ok) throw new Error("Invalid or expired token");

        setStatus("success");
        setTimeout(() => router.push(`/auth/setup-password?token=${tokenFromParams}`), 2000);
      } catch {
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
          <p className="text-green-600 font-semibold">Email verified! Redirecting...</p>
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
      {status === "error" && <p className="text-red-500 font-semibold">Verification failed.</p>}
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
