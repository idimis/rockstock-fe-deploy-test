'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSolidUser, BiSolidHeart } from 'react-icons/bi';
import { FaCartShopping } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import logoImage from "@/public/rockstock1.svg";
import { fetchCartQuantity } from '@/services/cartService';
import { decodeToken } from '@/lib/utils/decodeToken';
import { getAccessToken } from '@/lib/utils/auth';

type UserRole = "Customer" | "Super Admin" | "Warehouse Admin";

const Navbar = () => {
  const [isActive, setIsActive] = useState<string>('');
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<{ roles: UserRole } | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect( () => {
    fetchCartQuantity(setCartQuantity);

    const token = getAccessToken();
    setAccessToken(token);

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && ["Customer", "Super Admin", "Warehouse Admin"].includes(decodedToken.roles)) {
        setDecoded({ roles: decodedToken.roles as UserRole });
      }
    }

    const handleStorageChange = () => {
      const updatedToken = getAccessToken();
      fetchCartQuantity(setCartQuantity);
      setAccessToken(updatedToken);
      if (updatedToken) {
        const decodedToken = decodeToken(updatedToken);
        if (decodedToken && ["Customer", "Super Admin", "Warehouse Admin"].includes(decodedToken.roles)) {
          setDecoded({ roles: decodedToken.roles as UserRole });
        } else {
          setDecoded(null);
        }
      } else {
        setDecoded(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setDecoded(null);
    setMenuOpen(false);
  };

  const handleLinkClick = (link: string) => {
    setIsActive(link);
  };

  const dashboardLinks: Record<UserRole, string> = {
    Customer: "/dashboard/user",
    "Super Admin": "/dashboard/admin",
    "Warehouse Admin": "/dashboard/admin",
  };

  const profileLinks: Record<UserRole, string> = {
    Customer: "/dashboard/user/profile",
    "Super Admin": "/dashboard/admin/settings",
    "Warehouse Admin": "/dashboard/admin/settings",
  };

  return (
    <header className="bg-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image 
              src={logoImage} 
              alt="Rockstock Logo" 
              width={400} 
              height={200} 
              className="w-40 md:w-60 h-auto"
            />
          </Link>
        </div>

        {/* Search and account section */}
        <div className="flex items-center space-x-8">

          {/* Search bar */}
          <div className="relative flex-1 max-w-lg ml-6">
            <input
              type="text"
              placeholder="Search furniture..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="absolute top-1 right-0 p-2 bg-red-600 rounded-md text-white">
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
          
          {/* Authentication Buttons */}
          {!accessToken ? (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="px-4 py-1 border text-white bg-red-600 font-bold rounded-lg hover:bg-red-700">Login</Link>
              <Link href="/register" className="px-4 py-1 border border-red-600 text-red-600 font-bold rounded-lg hover:bg-gray-200">Register</Link>
            </div>
          ) : (
            <div className='flex items-center space-x-6'>
        
              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className={`relative inline-flex items-center text-red-600 hover:text-red-600 transition ${
                  isActive === '/cart' ? 'font-bold' : ''
                }`}
                onClick={() => handleLinkClick('/cart')}
              >
                <FaCartShopping className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-4 -right-3.5 border border-red-500 bg-white text-red-500 text-xs font-bold px-2 py-1 rounded-full">
                    {cartQuantity}
                  </span>
                )}
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
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center text-red-600 hover:text-red-600 transition">
                  <BiSolidUser className="h-5 w-5" />
                </button>
                {menuOpen && decoded && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                    <Link href={dashboardLinks[decoded.roles]} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href={profileLinks[decoded.roles]} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;