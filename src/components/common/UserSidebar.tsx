"use client";

import Link from "next/link";

const UserSidebar = () => {
  return (
    <aside className="bg-white shadow-md w-64 p-4 hidden lg:block">
      <h2 className="text-lg font-semibold mb-4">User Dashboard</h2>
      <ul className="space-y-2">
        <SidebarMenu 
          title="📦 My Orders" 
          links={[
            { name: "View Orders", path: "/dashboard/user/my-orders" },
            { name: "Track Order", path: "/dashboard/user/orders/track" }
          ]}
        />
        <SidebarMenu 
          title="🛒 Cart" 
          links={[
            { name: "View Cart", path: "/dashboard/user/cart" }
          ]}
        />
        <SidebarMenu 
        title="🚛 Shipping" 
        links={[
          { name: "Manage Address", path: "/dashboard/user/address" },
          { name: "Shipping Costs", path: "/dashboard/user/shipping" }
          ]}
        />
        <SidebarMenu 
          title="👤 Profile" 
          links={[
            { name: "View Profile", path: "/dashboard/user/profile" },
          ]}
        />
        <SidebarMenu 
          title="❓ Help" 
          links={[
            { name: "Support & FAQ", path: "/dashboard/user/help" },
          ]}
        />
        <li className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition">
          <Link href="/">🏠 Back to Homepage</Link>
        </li>
        <li className="p-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-100 active:bg-red-200 transition">
          <Link href="/logout">🚪 Logout</Link>
        </li>
      </ul>
    </aside>
  );
};


const SidebarMenu = ({ title, links }: { title: string; links: { name: string; path: string }[] }) => (
  <div>
    <h3 className="text-sm font-semibold mt-4 mb-2">{title}</h3>
    <ul className="space-y-1">
      {links.map((link, index) => (
        <li key={index} className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition">
          <Link href={link.path}>{link.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default UserSidebar;
