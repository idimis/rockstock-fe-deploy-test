"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
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
        <h2 className="text-lg font-semibold mb-4">Dashboard Admin</h2>
        <ul className="space-y-2">
          <SidebarItem title="📊 Dashboard Overview" path="/dashboard/admin" />
          <SidebarSection
            title="📦 Order Management"
            links={[{ name: "View Orders", path: "/dashboard/admin/orders" }]}
          />
          <SidebarSection
            title="🏢 Warehouse Management"
            links={[
              { name: "Manage Warehouse", path: "/dashboard/admin/warehouse" },
              { name: "Assign Warehouse Admin", path: "/dashboard/admin/warehouse/assign-warehouse-admin" },
              { name: "Stock Transfer Requests", path: "/dashboard/admin/warehouse/transfers" },
            ]}
          />
          <SidebarSection
            title="📦 Stock & Inventory"
            links={[{ name: "Manage Stock", path: "/dashboard/admin/stock" }]}
          />
          <SidebarSection
            title="🛒 Product Management"
            links={[{ name: "Manage Products", path: "/dashboard/admin/products" }]}
          />
          <SidebarSection
            title="👥 User Management"
            links={[{ name: "Manage Admins & Users", path: "/dashboard/admin/user-management" }]}
          />
          <SidebarSection
            title="📈 Reports & Analytics"
            links={[{ name: "Sales Report", path: "/dashboard/admin/reports" }]}
          />
          <SidebarSection
            title="⚙️ Settings"
            links={[{ name: "Account Settings", path: "/dashboard/admin/settings" }]}
          />
          <SidebarItem title="🏠 Back to Homepage" path="/" />
          <SidebarItem title="🚪 Logout" path="/logout" isLogout />
        </ul>
      </aside>

      {/* Overlay saat sidebar terbuka di mobile */}
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
const SidebarSection = ({ title, links }: { title: string; links: { name: string; path: string }[] }) => (
  <div>
    <h3 className="text-sm font-semibold mt-4 mb-2">{title}</h3>
    <ul className="space-y-1">
      {links.map((link, index) => (
        <SidebarItem key={index} title={link.name} path={link.path} />
      ))}
    </ul>
  </div>
);

export default AdminSidebar;
