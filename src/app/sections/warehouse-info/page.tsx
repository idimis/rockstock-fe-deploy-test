"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import dynamic from 'next/dynamic';

interface Warehouse {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  cityId: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Custom Marker Icon using emoji pinpoint
const customMarkerIcon = L.divIcon({
  html: '<span style="font-size: 24px;">📍</span>',
  className: '',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -42],
});

// Variations for manager names
const managerNames = [
  "John Doe - The Warehouse Roadie",
  "Jane Smith - The Warehouse Rockstar",
  "Alex Turner - The Logistics Maestro",
  "Sam Maverick - The Warehouse Commander",
  "Andre Matumanikam - The Vulture Director"
];

// Variations for image sources
const imageSrcVariations = [
  "https://mecaluxke.cdnwm.com/case-studies/example-conventional-pallet-racking-dolmar-poland/img-0.1.0.jpg",
  "https://i.shgcdn.com/a4bbb4e4-18c8-4a41-9522-a984c74f4351/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  "https://source.unsplash.com/random/400x300/?warehouse",
  "https://i.shgcdn.com/8eab3b39-f8b6-4a2f-bae7-fde4d352c2e7/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  "https://dallasofficefurniture.com/wp-content/uploads/2019/10/P1290925.jpg"
];

// Placeholder source links for manager photos
const managerPhotoSrc = [
  "https://www.damotech.com/hs-fs/hubfs/Warehouse%20manager-1.png?width=585&height=390&name=Warehouse%20manager-1.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsDcEv-96dX4-yXJndNyG9Wh9oYz592RElfQ&s",
  "https://media.istockphoto.com/id/1460822222/photo/warehouse-stock-management-and-logistics-man-portrait-of-a-retail-shipping-analyst-working.jpg?s=612x612&w=0&k=20&c=qcVH1zyp8olLbXPIpB9Of7xtFIzSS0BFsMlLPfoga10=",
  "https://media.istockphoto.com/id/1413867330/photo/worker-in-the-factory.jpg?s=612x612&w=0&k=20&c=MhO-Mpp_jCcBJZjwLHe2wbAw3elUNy003VI9OtRs-8Y=",
  "https://media.istockphoto.com/id/1212669780/photo/happy-male-factory-manager-using-digital-tablet-in-warehouse-while-standing-against-goods.jpg?s=612x612&w=0&k=20&c=8fE1wgtE7Ebsq-FBpxshBWpcx749B1PVYWcaLueRKMc="
];

const WarehouseMapPage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Warehouse[]>(`${BACKEND_URL}/api/v1/warehouses`);
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
            <h1 
              className="text-4xl font-bold mb-2 font-serif" 
              style={{ fontFamily: "'Bodoni MT', serif" }}
            >
              Hello, Old Rockers!
            </h1>
            <p className="text-lg text-gray-700">
              Welcome to the coolest warehouse arena, where every facility is a true rock star! 
              Here, logistics meets style, and every warehouse is a stage for epic action. 
              Get ready to feel the unforgettable rock &apos;n&lsquo; roll vibes!
            </p>
          </div>
          {/* Warehouse Info Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">🏭 Warehouse Locations</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading ? (
              <p className="text-center text-gray-500 animate-pulse">Loading...</p>
            ) : (
              <ul>
                {warehouses.map((warehouse) => (
                  <li 
                    key={warehouse.id} 
                    className="p-4 bg-white rounded-lg shadow mb-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedWarehouse(warehouse)}
                  >
                    <h3 className="font-semibold">{warehouse.name}</h3>
                    <p className="text-gray-600">{warehouse.address}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full lg:w-1/2 h-[500px] flex justify-center items-center">
          <MapContainer center={[-6.1751, 106.8650]} zoom={12} className="h-full w-full max-w-3xl">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {warehouses.map((warehouse) => (
              <Marker
                key={warehouse.id}
                position={[
                  parseFloat(warehouse.latitude),
                  parseFloat(warehouse.longitude),
                ]}
                icon={customMarkerIcon}
              >
                <Popup>
                  <span role="img" aria-label="pin">📍</span> {warehouse.name}<br />
                  {warehouse.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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
      
      {/* Warehouse Detail Modal */}
      {selectedWarehouse && (
        <div 
          style={{ zIndex: 9999 }} 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-100">
            <h2 className="text-xl font-bold mb-4">{selectedWarehouse.name}</h2>
            {/* Image placeholder with variations for warehouse */}
            <Image
              src={imageSrcVariations[selectedWarehouse.id % imageSrcVariations.length]} 
              alt="Warehouse"
              width={300} 
              height={300}  
              className="w-full mb-4 rounded"
            />
            <p className="mb-2"><strong>Address:</strong> {selectedWarehouse.address}</p>
            <p className="mb-2"><strong>Latitude:</strong> {selectedWarehouse.latitude}</p>
            <p className="mb-2"><strong>Longitude:</strong> {selectedWarehouse.longitude}</p>
            {/* Additional info with rockstar tone and manager name variations */}
            <p className="mb-2">
              <strong>Manager:</strong> {managerNames[selectedWarehouse.id % managerNames.length]}
            </p>
            {/* Manager Photo Placeholder */}
            <Image
            src={managerPhotoSrc[selectedWarehouse.id % managerPhotoSrc.length]} 
            alt="Manager" 
            width={300} 
              height={300} 
            className="w-24 h-24 rounded-full mb-4 object-cover object-center"
          />

            <p className="mb-4"><strong>Operating Hours:</strong> 9 AM - 6 PM. Time to rock!</p>
            <button 
              onClick={() => setSelectedWarehouse(null)} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default WarehouseMapPage;
