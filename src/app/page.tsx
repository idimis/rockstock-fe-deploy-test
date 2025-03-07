"use client";

import React from 'react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Navbar';
import Navbar from '@/components/common/Header';
import AiSection from '@/components/homepage/AiSection';
import HeroSection from '@/components/homepage/HeroSection';
import ProductCategories from '@/components/homepage/ProductCategories';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import NewestProducts from '@/components/homepage/NewestProducts';
import Manifesto from '@/components/homepage/Manifesto';
import ReviewSection from '@/components/homepage/ReviewSection';

// import Testimonials from '@/components/homepage/Testimonials';



const Page: React.FC = () => {
  return (
      <div>
        
        <Navbar />
        <Header />
        <Manifesto />
        <HeroSection />
        <AiSection />
        <FeaturedProducts />
        <NewestProducts />
        <ReviewSection />
        <ProductCategories />
        {/* <Testimonials /> */}
        <Footer />
       
      </div>
  );
};

export default Page;
