"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol toggle untuk mobile */}
      <button
        className="p-2 bg-gray-800 text-white rounded-md md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md w-64 p-4 fixed inset-y-0 left-0 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:block`}
      >
        <h2 className="text-lg font-semibold mb-4">User Dashboard</h2>
        <ul className="space-y-2">
          <SidebarMenu title="📦 My Orders" links={[{ name: "View Orders", path: "/dashboard/user/orders" }]} />
          <SidebarMenu title="🛒 Cart" links={[{ name: "View Cart", path: "/dashboard/user/cart" }]} />
          <SidebarMenu
            title="🚛 Shipping"
            links={[
              { name: "Manage Address", path: "/dashboard/user/address" },
              { name: "Shipping Costs", path: "/dashboard/user/shipping" },
            ]}
          />
          <SidebarMenu title="👤 Profile" links={[{ name: "View Profile", path: "/dashboard/user/profile" }]} />
          <SidebarMenu title="❓ Help" links={[{ name: "Support & FAQ", path: "/dashboard/user/help" }]} />
          <SidebarItem title="🏠 Back to Homepage" path="/" />
          <SidebarItem title="🚪 Logout" path="/logout" isLogout />
        </ul>
      </aside>

      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

// Komponen untuk item sidebar biasa
const SidebarItem = ({ title, path, isLogout }: { title: string; path: string; isLogout?: boolean }) => (
  <li className={`p-2 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition ${isLogout ? "text-red-500 hover:bg-red-100 active:bg-red-200" : ""}`}>
    <Link href={path}>{title}</Link>
  </li>
);

// Komponen untuk section dengan beberapa link
const SidebarMenu = ({ title, links }: { title: string; links: { name: string; path: string }[] }) => (
  <div>
    <h3 className="text-sm font-semibold mt-4 mb-2">{title}</h3>
    <ul className="space-y-1">
      {links.map((link, index) => (
        <SidebarItem key={index} title={link.name} path={link.path} />
      ))}
    </ul>
  </div>
);

export default UserSidebar;
