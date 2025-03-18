"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const AdminSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
      className={`bg-white shadow-md w-64 p-4 fixed lg:static top-0 left-0 h-full z-50 lg:z-10 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:block`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Dashboard Admin</h2> 
        <button onClick={onClose} className="flex md:hidden">
          <IoMdClose size={24} />
        </button>
      </div>
      <ul className="space-y-2">
        <li className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition">
          <Link href="/dashboard/admin">📊 Dashboard Overview</Link>
        </li>
        <SidebarMenu 
          title="📦 Order Management" 
          links={[{ name: "Manage Order", path: "/dashboard/admin/orders" }]}
        />
        <SidebarMenu 
          title="🏢 Warehouse Management" 
          links={[
            { name: "Manage Warehouse", path: "/dashboard/admin/warehouse" },
            { name: "Assign Warehouse Admin", path: "/dashboard/admin/warehouse/assign-warehouse-admin" },
            { name: "Stock Transfer Requests", path: "/dashboard/admin/warehouse/transfers" }
          ]}
        />
        <SidebarMenu 
          title="📦 Stock & Inventory" 
          links={[
            { name: "Manage Stocks", path: "/dashboard/admin/stocks" },
            { name: "Mutation Journals", path: "/dashboard/admin/journals" }
          ]}
        />
        <SidebarMenu 
          title="🛒 Product Management" 
          links={[
            { name: "Manage Categories", path: "/dashboard/admin/categories" },
            { name: "Manage Products", path: "/dashboard/admin/products" }
          ]}
        />
        <SidebarMenu 
          title="👥 User Management" 
          links={[
            { name: "Manage Admins & Users", path: "/dashboard/admin/user-management" },
          ]}
        />
        <SidebarMenu 
          title="📈 Reports & Analytics" 
          links={[
            { name: "Sales Report", path: "/dashboard/admin/reports/sales" }
          ]}
        />
        <SidebarMenu 
          title="⚙️ Settings" 
          links={[
            { name: "Account Settings", path: "/dashboard/admin/settings" }
          ]}
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

export default AdminSidebar;
