'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSolidUser, BiSolidHeart } from 'react-icons/bi';
import { FaCartShopping } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import logoImage from "@/public/rockstock1.svg";

const Navbar = () => {
  const [isActive, setIsActive] = useState<string>('');

  // Update active state based on current page link
  const handleLinkClick = (link: string) => {
    setIsActive(link);
  };

  return (
    <header className="bg-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Main logo and header */}
        <div>
          <Link href="/">
            <Image
              src={logoImage}
              alt="Rockstock Logo"
              width={400}
              height={200}
            />
          </Link>
        </div>

        {/* Search and account section */}
        <div className="flex items-center space-x-6">
          {/* Account & Cart Links */}
          <div className="flex space-x-6">
            {/* Account Icon */}
            <Link
              href="/login"
              className={`inline-flex items-center text-red-600 hover:text-red-600 transition ${
                isActive === '/login' ? 'font-bold' : ''
              }`}
              onClick={() => handleLinkClick('/login')}
            >
              <BiSolidUser className="h-5 w-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className={`inline-flex items-center text-red-600 hover:text-red-600 transition ${
                isActive === '/wishlist' ? 'font-bold' : ''
              }`}
              onClick={() => handleLinkClick('/wishlist')}
            >
              <BiSolidHeart className="h-5 w-5" />
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className={`inline-flex items-center text-red-600 hover:text-red-600 transition ${
                isActive === '/cart' ? 'font-bold' : ''
              }`}
              onClick={() => handleLinkClick('/cart')}
            >
              <FaCartShopping className="h-5 w-5" />
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-lg ml-6">
  <input
    type="text"
    placeholder="Search furniture..."
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
  />
  <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-red-600 rounded-md text-white">
    <FiSearch className="h-5 w-5" />
  </button>
</div>

        </div>
      </div>

      {/* Second navbar (horizontal navigation) */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between space-x-6">
            <li>
              <Link
                href="/furniture"
                className="text-sm text-black hover:text-red-600"
              >
                Furniture Collections
              </Link>
            </li>
            <li>
              <Link
                href="/spaces"
                className="text-sm text-black hover:text-red-600"
              >
                Spaces & Design Inspirations
              </Link>
            </li>
            <li>
              <Link
                href="/offers"
                className="text-sm text-black hover:text-red-600"
              >
                Special Offers & Discounts
              </Link>
            </li>
            <li>
              <Link
                href="/last-chance"
                className="text-sm text-black hover:text-red-600"
              >
                Last Chance Deals
              </Link>
            </li>
            <li>
              <Link
                href="/essentials"
                className="text-sm text-black hover:text-red-600"
              >
                Everyday Essentials: 99-199k
              </Link>
            </li>
            <li>
              <Link
                href="/business"
                className="text-sm text-black hover:text-red-600"
              >
                Rockstock for Business
              </Link>
            </li>
            <li>
              <Link
                href="/interior-design"
                className="text-sm text-black hover:text-red-600"
              >
                Interior Design Services
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
