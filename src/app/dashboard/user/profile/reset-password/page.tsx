"use client";

import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      let data;
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: await response.text() }; 
      }
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link. Please try again.");
      }
  
      setSuccess(true);
    }  catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">Reset Password</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Enter your email to receive a password reset link.</p>

      {success ? (
        <p className="text-red-600 font-semibold">Password reset link sent! Check your email.</p>
      ) : (
        <form onSubmit={handleSendResetLink} className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;