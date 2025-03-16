"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import axios from "axios";
import Image from "next/image";

interface Warehouse {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  cityId: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Variations for image sources
const imageSrcVariations = [
  "https://mecaluxke.cdnwm.com/case-studies/example-conventional-pallet-racking-dolmar-poland/img-0.1.0.jpg",
  "https://i.shgcdn.com/a4bbb4e4-18c8-4a41-9522-a984c74f4351/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  "https://source.unsplash.com/random/400x300/?warehouse",
  "https://i.shgcdn.com/8eab3b39-f8b6-4a2f-bae7-fde4d352c2e7/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  "https://dallasofficefurniture.com/wp-content/uploads/2019/10/P1290925.jpg"
];

const WarehouseListPage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Warehouse[]>(`${BACKEND_URL}/api/v1/warehouse`);
      setWarehouses(response.data);
    } catch {
      setError("Failed to fetch warehouses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <Navbar />
      <div className="flex flex-grow p-6 bg-white shadow-lg rounded-xl items-stretch min-h-[400px]">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 pr-6">
          {/* Greetings Section */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 font-serif" style={{ fontFamily: "'Bodoni MT', serif" }}>
              Hello, Old Rockers!
            </h1>
            <p className="text-lg text-gray-700">
              Welcome to the coolest warehouse arena, where every facility is a true rock star!
              Here, logistics meets style, and every warehouse is a stage for epic action. 
              Get ready to feel the unforgettable rock &apos;n&lsquo; roll vibes!
            </p>
          </div>

          {/* Warehouse List Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">🏭 Warehouse Locations</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading ? (
              <p className="text-center text-gray-500 animate-pulse">Loading...</p>
            ) : (
              <div className="space-y-6">
                {warehouses.map((warehouse) => (
                  <div 
                    key={warehouse.id} 
                    className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex-shrink-0 w-32 h-32 relative">
                      <Image
                        src={imageSrcVariations[warehouse.id % imageSrcVariations.length]}
                        alt="Warehouse"
                        width={128}
                        height={128}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold">{warehouse.name}</h3>
                      <p className="text-gray-600">{warehouse.address}</p>
                      <div className="mt-2">
                        <span className="text-sm text-gray-500">Latitude: </span>
                        <span>{warehouse.latitude}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-sm text-gray-500">Longitude: </span>
                        <span>{warehouse.longitude}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* General Information Section */}
      <div className="p-6 bg-gray-50 text-gray-800">
        <h2 className="text-xl font-bold mb-4">General Information</h2>
        <p className="mb-2">
          <span role="img" aria-label="directions">🗺️</span> Our warehouses are located in the heart of the city. Simply follow the main highway, and you will reach the warehouse area easily. Parking and public transport options are available.
        </p>
        <p className="mb-2">
          <span role="img" aria-label="policy">🛡️</span> Please adhere to our safety guidelines when visiting our facilities. No unauthorized access allowed and maintain a respectful distance from operational areas.
        </p>
        <p className="mb-2">
          <span role="img" aria-label="interaction">🤝</span> Our staff are friendly and ready to assist. Feel free to ask questions and engage with them for a truly rockstar experience.
        </p>
        <p className="mb-2">
          <span role="img" aria-label="culture">🎸</span> At Rockstock, we embrace a rock &apos;n&lsquo; roll spirit in everything we do. We believe in quality, authenticity, and a touch of rebellious energy.
        </p>
        <p className="mb-2">
          <span role="img" aria-label="inquiries">✉️</span> For more information, please contact us at <a href="mailto:support@rockstock.com" className="text-blue-500 hover:underline">support@rockstock.com</a> or call (123) 456-7890.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default WarehouseListPage;
