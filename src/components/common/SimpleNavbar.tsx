'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from "@/public/rockstock1.svg";

const SimpleNavbar = () => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src={logoImage} alt="Rockstock Logo" width={200} height={100} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleNavbar;