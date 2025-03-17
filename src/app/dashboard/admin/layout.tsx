"use client";

import AdminSidebar from "@/components/common/AdminSidebar";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SimpleNavbar from "@/components/common/SimpleNavbar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminDashboard = pathname.startsWith("/dashboard/admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <SimpleNavbar />
      <div className="flex flex-col lg:flex-row">
        {isAdminDashboard && (
          <>
            <button
              className="lg:hidden p-2 m-2 text-black bg-white rounded-md flex gap-2 items-center"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu size={24} />
              <h1 className="text-black font-semibold">Navigation Menu</h1>
            </button>
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </>
        )}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>  
  );
}
