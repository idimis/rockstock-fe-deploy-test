// components/Navbar.tsx

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-center">
        <ul className="flex space-x-8">
        <li>
            <Link href="/" className="text-gray-700 text-sm hover:text-red-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/sections/inspirations" className="text-gray-700 text-sm hover:text-red-600">
              Inspirations
            </Link>
          </li>
          <li>
            <Link href="/sections/program-plan" className="text-gray-700 text-sm hover:text-red-600">
              Program Plan
            </Link>
          </li>
          <li>
            <Link href="/sections/shipment-tracking" className="text-gray-700 text-sm hover:text-red-600">
              Shipment Tracking
            </Link>
          </li>
          <li>
            <Link href="/sections/warehouse-info" className="text-gray-700 text-sm hover:text-red-600">
              Warehouse Info
            </Link>
          </li>
          <li>
            <Link href="/sections/free-design" className="text-gray-700 text-sm hover:text-red-600">
              Free Interior Design
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
