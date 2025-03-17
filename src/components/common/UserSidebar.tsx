"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

const UserSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();

  const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      localStorage.removeItem("userId");
      
      signOut({ redirect: false }).then(() => {
        router.push("/");
      });
    };

  return (
    <aside
      className={`bg-white shadow-md w-64 p-4 fixed lg:static top-25 left-0 h-full transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:block`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">User Dashboard</h2>
        <button onClick={onClose} className="flex md:hidden">
          <IoMdClose size={24} />
        </button>
      </div>
      <ul className="space-y-2">
        <SidebarMenu 
          title="👤 My Profile" 
          links={[
            { name: "View Profile", path: "/dashboard/user/profile" },
            { name: "Reset Password", path: "/dashboard/user/profile/reset-password" }
          ]} 
        />
        <SidebarMenu 
          title="📍 My Address" 
          links={[{ name: "Manage Address", path: "/dashboard/user/address" }]} 
        />
        <SidebarMenu 
          title="🛒 My Cart" 
          links={[{ name: "View Cart", path: "/dashboard/user/cart" }]} 
        />
        <SidebarMenu 
          title="📦 My Orders" 
          links={[{ name: "View Orders", path: "/dashboard/user/orders" }]} 
        />
        <SidebarMenu 
          title="❓ Help" 
          links={[{ name: "Support & FAQ", path: "/dashboard/user/help" }]} 
        />
        <li>
          <button 
            onClick={handleLogout} 
            className="w-full p-2 mt-4 rounded-lg text-left text-red-500 hover:bg-red-100 active:bg-red-200 transition"
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

const SidebarMenu = ({ title, links }: { title: string; links: { name: string; path: string }[] }) => {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-sm font-semibold mt-4 mb-2">{title}</h3>
      <ul className="space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <button 
              onClick={() => router.push(link.path)} 
              className="w-full p-2 rounded-lg text-left hover:bg-gray-200 active:bg-gray-300 transition"
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSidebar;
