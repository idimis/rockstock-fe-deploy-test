import React from 'react';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Navbar from '@/components/common/Navbar';

const ShipmentTracking: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-16"> {/* Increased padding top and bottom */}
        <h1 className="text-2xl font-bold mb-4">Shipment Tracking</h1>
        <p className="text-gray-700 mb-6">
          The quickest way to check your delivery status. Simply enter your Web Order Number or order code below. 
          Please note that tracking data might take up to 24 hours to be available.
        </p>
        <form className="max-w-md mx-auto mb-8">
          <label htmlFor="orderCode" className="block mb-2 font-medium">
            Enter your Web Order Number or Order Code:
          </label>
          <input
            id="orderCode"
            type="text"
            placeholder="e.g., 603123456789"
            className="border rounded w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 w-full"
          >
            Track Order
          </button>
        </form>
        

        <p className="text-sm text-gray-600 mt-4 text-center">
          By entering the order code and using the track and trace service, I agree to the Privacy Policy of Rockstock.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ShipmentTracking;
