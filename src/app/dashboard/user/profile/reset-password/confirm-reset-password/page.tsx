"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ConfirmResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationNewPassword, setConfirmationNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // State untuk menampilkan password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mengambil token setelah halaman dimount di client
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Invalid or missing reset token.");
    } else {
      setResetToken(token);
    }
  }, [searchParams]);

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetToken) {
      setError("Token is missing.");
      return;
    }

    if (newPassword !== confirmationNewPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/confirm-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken,
          oldPassword,
          newPassword,
          confirmationNewPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password. Please try again.");
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
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
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black"
    >
      <h1 className="text-4xl font-bold text-red-700 mb-4 text-center">Reset Password</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Update your password securely.</p>

      {success ? (
        <p className="text-green-600 font-semibold text-center">
          Password reset successful! Redirecting to login...
        </p>
      ) : (
        <motion.form 
          onSubmit={handleConfirmReset} 
          className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter old password"
                className="border border-gray-300 text-black rounded-lg p-2 w-full"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ?"🙈" : "👁️"} 
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="border border-gray-300 text-black rounded-lg p-2 w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="border border-gray-300 text-black rounded-lg p-2 w-full"
                value={confirmationNewPassword}
                onChange={(e) => setConfirmationNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-red-700 text-white font-semibold py-3 px-4 rounded-xl hover:bg-red-800 transition duration-300 w-full"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ConfirmResetPasswordPage;
