"use client";

import { useState } from "react";
import axios from "axios";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UserSidebarPanel from "@/components/common/UserSidebar";

// Type Definitions
type Address = {
  city_id: string;
  city_name: string;
  postal_code: string;
};

type DestinationOption = {
  city_id: string;
  city_name: string;
};


const ShippingCalculation = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [destinationOptions, setDestinationOptions] = useState<DestinationOption[]>([]);
  const [selectedCourier, setSelectedCourier] = useState("jne");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "YOUR_API_KEY_HERE";

  // Fetch list of cities from API
  const fetchDestinations = async (city: string) => {
    if (!city) return;

    try {
      setLoading(true);
      const response = await axios.get("https://rajaongkir.komerce.id/api/v1/destination/domestic-destination", {
        params: { search: city, limit: 10 },
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      const cities = response.data.results;
      setDestinationOptions(cities);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      alert("Failed to fetch destination data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch shipping cost
  const calculateShipping = async () => {
    if (!selectedAddress || !postalCode) {
      alert("Please select a city and enter a postal code.");
      return;
    }

    const origin = selectedAddress.city_id;
    const destination = destinationOptions.length > 0 ? destinationOptions[0].city_id : null;
    if (!destination) {
      alert("Invalid destination.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost",
        {
          origin,
          destination,
          weight: 1000,
          courier: selectedCourier,
          price: "lowest",
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );

      const costData = response.data.results[0]?.costs[0];
      setShippingCost(costData?.value ?? 0);
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
      alert("Failed to calculate shipping cost.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <Navbar />
      <div className="flex flex-grow">
        <UserSidebarPanel />
        <main className="flex-grow p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-4">🚚 Shipping Calculation</h1>

          <div className="p-4 bg-gray-100 shadow rounded-lg">
            {/* City Input with Auto-fetch */}
            <input
              type="text"
              placeholder="Enter City"
              className="w-full p-2 border rounded-lg mt-2"
              onChange={(e) => fetchDestinations(e.target.value)}
            />

            {/* Select Destination City */}
            {destinationOptions.length > 0 && (
              <select
                className="w-full p-2 border rounded-lg mt-4"
                onChange={(e) => {
                  const selectedCity = destinationOptions.find((city) => city.city_id === e.target.value);
                  if (selectedCity) {
                    setSelectedAddress({
                      city_id: selectedCity.city_id,
                      city_name: selectedCity.city_name,
                      postal_code: postalCode,
                    });
                  }
                }}
              >
                <option value="">Select Destination City</option>
                {destinationOptions.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            )}

            {/* Postal Code Input */}
            <input
              type="text"
              placeholder="Enter Postal Code"
              className="w-full p-2 border rounded-lg mt-2"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            {/* Courier Selection */}
            <select
              className="w-full p-2 border rounded-lg mt-4"
              onChange={(e) => setSelectedCourier(e.target.value)}
              value={selectedCourier}
            >
              <option value="jne">JNE</option>
              <option value="sicepat">SiCepat</option>
              <option value="jnt">J&T</option>
              <option value="tiki">TIKI</option>
            </select>

            {/* Calculate Shipping Button */}
            <button
              className={`mt-4 px-4 py-2 rounded-lg text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
              }`}
              onClick={calculateShipping}
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Shipping Cost"}
            </button>

            {/* Display Shipping Cost */}
            {shippingCost !== null && (
              <p className="mt-4 text-lg font-semibold">Estimated Shipping Cost: Rp {shippingCost}</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingCalculation;
