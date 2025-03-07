import React from 'react';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Header from '@/components/common/Header';
import Image from "next/image";

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
            <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg">
              {/* Dummy Image Placeholder */}
              <Image
                src="https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/6f6dd238-0ff1-46c9-8ed4-1dccc4fec021/_1d9853d8-fade-4ecb-8f35-5de566acf3dc.jpeg"
                alt="Dark Academia Library"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Dark Academia Library</h2>
            <p className="text-gray-600">
              Create your dream reading nook with shelves and seating that embody classic elegance and intellectual charm.
            </p>
          </div>

          {/* Inspiration Item 2 */}
          <div className="bg-white shadow rounded p-4">
            <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg">
              {/* Dummy Image Placeholder */}
              <Image
                src="https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/1f58fb62-3643-4607-b606-d80b8ac3b68f/_0d3afc94-edaf-4809-b7e2-f22c48f98476.jpeg"
                alt="Gothic Living Room"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Gothic Living Room</h2>
            <p className="text-gray-600">
              Elevate your space with ornate furniture and dark tones for a mysterious and dramatic atmosphere.
            </p>
          </div>

          {/* Inspiration Item 3 */}
          <div className="bg-white shadow rounded p-4">
            <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg">
              {/* Dummy Image Placeholder */}
              <Image
                src="https://images.squarespace-cdn.com/content/v1/59ee0010f43b55d3703661eb/1627386648118-8NFSG636W29RTGG06ZOJ/Emo+statement+wall"
                alt="Emo-Inspired Workspace"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Emo-Inspired Workspace</h2>
            <p className="text-gray-600">
              Design a creative and moody workspace with bold contrasts and personalized touches.
            </p>
          </div>

          {/* Inspiration Item 4 */}
<div className="bg-white shadow rounded p-4">
  <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg">
    {/* Dummy Image Placeholder */}
    <Image
      src="https://civilisable.com/wp-content/uploads/2024/01/Italian-Renaissance-Homes-27.1.2024.jpg"
      alt="Renaissance Revival Room"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
  <h2 className="text-lg font-semibold mb-2">Renaissance Revival Room</h2>
  <p className="text-gray-600">
    Create a grand space with ornate furniture, classical artwork, and rich textures that reflect the opulence and historical grandeur of the Renaissance.
  </p>
</div>

{/* Inspiration Item 5 */}
<div className="bg-white shadow rounded p-4">
  <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg">
    {/* Dummy Image Placeholder */}
    <Image
      src="https://i.pinimg.com/736x/13/13/85/131385c5e42ca28b266aea420abb5654.jpg"
      alt="Punk Rock Room"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
  <h2 className="text-lg font-semibold mb-2">Punk Rock Room</h2>
  <p className="text-gray-600">
    Design an edgy, rebellious space with bold contrasts, eclectic decor, and a mix of vintage punk and modern elements that scream individuality and defiance.
  </p>
</div>


          {/* Inspiration Item 6 */}
          <div className="bg-white shadow rounded p-4">
            <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg">
              {/* Dummy Image Placeholder */}
              <Image
                src="https://www.bhg.com/thmb/b6hXXmRG9m_GDznOxr1QwkyhSs4=/1244x0/filters:no_upscale():strip_icc()/modern-style-living-room-red-accents-acb3c198-822cc76a4cb64185b2e890a6ebffc921.jpg"
                alt="Alternative Accent Pieces"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
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
