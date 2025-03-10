"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { DeliveryService, DeliveryServiceProps } from "@/types/delivery";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/calculate`;

const DeliveryServiceComponent: React.FC<DeliveryServiceProps> = ({ origin, destination, weight, setShippingFee }) => {
  const [services, setServices] = useState<DeliveryService[]>([]);
  const [selectedService, setSelectedService] = useState<DeliveryService | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = getAccessToken();

  const fetchDeliveryServices = useCallback(async () => {
    if (!origin || !destination || !weight || !accessToken) {
      console.warn("🚨 Missing required props or access token!", { origin, destination, weight, accessToken });
      return;
    }

    console.log("📡 Fetching delivery services...");

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        API_BASE_URL,
        { origin, destination, weight, courier: "jne" },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      console.log("✅ API Response:", response.data);

      if (response.data?.data) {
        setServices(response.data.data);
      } else {
        setServices([]);
        console.warn("⚠️ Unexpected response format:", response.data);
      }
    } catch (error) {
      setError("Failed to fetch delivery services.");
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios Error:", error.response?.data || error.message);
      } else {
        console.error("❌ Unexpected Error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [origin, destination, weight, accessToken]);

  useEffect(() => {
    fetchDeliveryServices();
  }, [fetchDeliveryServices]);

  const handleSelectService = (service: DeliveryService) => {
    setSelectedService(service);
    setShippingFee(service.cost);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Select Delivery Service</h2>

      {loading ? (
        <p>Loading delivery details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : services.length === 0 ? (
        <p className="text-gray-500">No delivery options available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-4 bg-white shadow border rounded-lg cursor-pointer hover:border-red-500 ${
                selectedService?.service === service.service ? "border-red-500" : "border-gray-300"
              }`}
              onClick={() => handleSelectService(service)}
            >
              <h3 className="font-semibold text-black">{service.description} ({service.service})</h3>
              <p className="text-gray-700">Estimated Delivery: {service.etd}s</p>
              <p className="text-black font-bold">Cost: Rp {service.cost.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryServiceComponent;