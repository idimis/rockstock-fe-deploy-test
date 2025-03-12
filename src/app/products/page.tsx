"use client";

import React from 'react';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Header from '@/components/common/Header';
import ProductCust from '@/components/products/ProductsCust';

const Inspirations: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-gray-700 font-bold mb-4">Inspirations</h1>
        <p className="text-gray-700">
          Discover unique furniture ideas that reflect your dark and edgy style. Whether you prefer the allure of gothic aesthetics, 
          the scholarly vibe of dark academia, or a nostalgic emo touch, we have something special for you.
        </p>
        <ProductCust />
      </main>
      <Footer />
    </div>
  );
};

export default Inspirations;