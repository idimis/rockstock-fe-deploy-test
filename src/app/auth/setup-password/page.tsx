"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const SetupPasswordContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!token) {
      setStatus("error");
      return;
    }
  
    if (password !== confirmPassword) {
      setStatus("error");
      return;
    }

    try {
      const url = `${BACKEND_URL}/api/v1/auth/setup-password?token=${token}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }), 
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => router.push("/dashboard/user"), 2000);
      } else {
        throw new Error("Failed to set password");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl text-black font-semibold mb-4">Set Your Password</h2>
      <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm">
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
      {status === "loading" && <p className="text-gray-600 mt-4">Setting password...</p>}
      {status === "success" && <p className="text-green-600 mt-4">Password set successfully!</p>}
      {status === "error" && <p className="text-red-500 mt-4">There was an error. Please try again.</p>}
    </div>
  );
};

const SetupPassword = () => (
  <Suspense fallback={<p className="text-gray-600 mt-4">Loading...</p>}>
    <SetupPasswordContent />
  </Suspense>
);

export default SetupPassword;
