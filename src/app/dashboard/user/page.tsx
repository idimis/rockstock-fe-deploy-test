"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/common/UserSidebar";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const UserDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [fullname, setFullname] = useState<string | null>(null);
  const [showSignupNotif, setShowSignupNotif] = useState(false);
  const [showActivationNotif, setShowActivationNotif] = useState(false);
  const [showPasswordSetupNotif, setShowPasswordSetupNotif] = useState(false);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  
    if (status === "loading") return;
  
    if (session?.user) {
      console.log("User logged in via social login:", session.user);
      sessionStorage.setItem("fullname", session.user.name ?? session.user.email ?? "User");
      sessionStorage.setItem("is_verified", "true");
      setFullname(session.user.name ?? session.user.email ?? "User");
    } else {
      const storedFullname = localStorage.getItem("fullname");
      const verifiedStatus = localStorage.getItem("is_verified") === "true";
      const isNewSignup = localStorage.getItem("newSignup") === "true";
      const isActivated = localStorage.getItem("accountActivated") === "true";
      const isPasswordSet = localStorage.getItem("passwordSet") === "true";
  
      console.log("Checking localStorage:", { storedFullname, verifiedStatus, isNewSignup, isActivated, isPasswordSet });
  
      if (storedFullname) {
        setFullname(storedFullname);
  
        if (isNewSignup) {
          setShowSignupNotif(true);
          localStorage.removeItem("newSignup");
          setTimeout(() => setShowSignupNotif(false), 5000);
        }
  
        if (isActivated) {
          setShowActivationNotif(true);
          localStorage.removeItem("accountActivated");
          setTimeout(() => setShowActivationNotif(false), 5000);
        }
  
        if (isPasswordSet) {
          setShowPasswordSetupNotif(true);
          localStorage.removeItem("passwordSet");
          setTimeout(() => setShowPasswordSetupNotif(false), 5000);
        }
      } else {
        console.log("Redirecting to /login...");
        setTimeout(() => router.push("/login"), 500);
      }
    }
  }, [session, status, router]);
  

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-4">👋 Welcome, {fullname}!</h1>

          {showSignupNotif && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p>✅ Your account has been created! Please check your email to verify your account.</p>
            </div>
          )}

          {showActivationNotif && (
            <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
              <p>🎉 Your account has been activated! You can now log in and start using your account.</p>
            </div>
          )}

          {showPasswordSetupNotif && (
            <div className="mb-4 p-4 bg-purple-100 border border-purple-400 text-purple-700 rounded-lg">
              <p>🔐 Your password has been successfully set! You can now log in securely.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-100 shadow rounded-lg">
              <h2 className="text-lg font-semibold">📦 My Orders</h2>
              <p className="text-2xl font-bold">5 Active Orders</p>
              <p className="text-sm text-gray-600">Track your recent purchases</p>
            </div>

            <div className="p-4 bg-green-100 shadow rounded-lg">
              <h2 className="text-lg font-semibold">💖 Wishlist</h2>
              <p className="text-2xl font-bold">12 Items</p>
              <p className="text-sm text-gray-600">Save items for later</p>
            </div>

            <div className="p-4 bg-yellow-100 shadow rounded-lg">
              <h2 className="text-lg font-semibold">💳 Account Balance</h2>
              <p className="text-2xl font-bold">$120.50</p>
              <p className="text-sm text-gray-600">Available for purchases</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
