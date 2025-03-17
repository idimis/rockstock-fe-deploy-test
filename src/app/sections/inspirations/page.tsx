import React from 'react';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Header from '@/components/common/Header';
import Image from "next/image";

import inspiration1 from "@/public/inspiration1.jpeg";
import inspiration2 from "@/public/inspiration2.jpeg";
import inspiration3 from "@/public/inspiration3.jpg";
import inspiration4 from "@/public/inspiration4.jpg";
import inspiration5 from "@/public/inspiration5.jpg";
import inspiration6 from "@/public/inspiration6.jpg";

const Inspirations: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Inspirations</h1>
        <p className="text-gray-700 mb-6">
          Discover unique furniture ideas that reflect your dark and edgy style. Whether you prefer the allure of gothic aesthetics, 
          the scholarly vibe of dark academia, or a nostalgic emo touch, we have something special for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inspiration Item 1 */}
          <div className="bg-white shadow rounded p-4">
            <Image src={inspiration1} alt="Dark Academia Library" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">Dark Academia Library</h2>
            <p className="text-gray-600">
              Create your dream reading nook with shelves and seating that embody classic elegance and intellectual charm.
            </p>
          </div>

          {/* Inspiration Item 2 */}
          <div className="bg-white shadow rounded p-4">
            <Image src={inspiration2} alt="Gothic Living Room" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">Gothic Living Room</h2>
            <p className="text-gray-600">
              Elevate your space with ornate furniture and dark tones for a mysterious and dramatic atmosphere.
            </p>
          </div>

          {/* Inspiration Item 3 */}
          <div className="bg-white shadow rounded p-4">
            <Image src={inspiration3} alt="Emo-Inspired Workspace" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">Emo-Inspired Workspace</h2>
            <p className="text-gray-600">
              Design a creative and moody workspace with bold contrasts and personalized touches.
            </p>
          </div>

          {/* Inspiration Item 4 */}
          <div className="bg-white shadow rounded p-4">
            <Image src={inspiration4} alt="Renaissance Revival Room" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">Renaissance Revival Room</h2>
            <p className="text-gray-600">
              Create a grand space with ornate furniture, classical artwork, and rich textures that reflect the opulence and historical grandeur of the Renaissance.
            </p>
          </div>

          {/* Inspiration Item 5 */}
          <div className="bg-white shadow rounded p-4">
            <Image src={inspiration5} alt="Punk Rock Room" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">Punk Rock Room</h2>
            <p className="text-gray-600">
              Design an edgy, rebellious space with bold contrasts, eclectic decor, and a mix of vintage punk and modern elements that scream individuality and defiance.
            </p>
          </div>

          {/* Inspiration Item 6 */}
          <div className="bg-white shadow rounded p-4">
            <Image src={inspiration6} alt="Alternative Accent Pieces" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">Alternative Accent Pieces</h2>
            <p className="text-gray-600">
              Add character to any room with unique decor items that speak to your alternative style.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inspirations;


