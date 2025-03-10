"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { IoIosPin } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Warehouse } from "@/types/warehouse";
import { Address, AddressComponentProps } from "@/types/address";
import { findNearestWarehouse } from "@/lib/utils/geolocationUtils";
import { fetchAddresses } from "@/lib/utils/address";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const accessToken = getAccessToken();

const AddressComponent: React.FC<AddressComponentProps> = ({ 
  setAddressId, 
  addressPostalCode, setAddressPostalCode, 
  nearestWarehouse, setNearestWarehouse
}) => {
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWarehouses = useCallback(async (attempt = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses`);
      const warehouseList = response.data;
      setWarehouses(warehouseList);
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An unknown error occurred";

      if (errorMessage.includes("JDBC")) {
        const retryDelay = Math.min(2 ** attempt * 1000, 30000);
        console.warn(`Retrying fetchWarehouses in ${retryDelay / 1000}s...`);
        setTimeout(() => fetchWarehouses(attempt + 1), retryDelay);
      } else {
        setError("Failed to fetch warehouses");
      }
    }
  }, []);
  
  useEffect(() => {
    if (!accessToken) return;
    setLoading(true)
    fetchAddresses(setDefaultAddress, setAddressId, setAddressPostalCode, setAddresses, setError);
    setLoading(false)
  }, [setAddressId, setAddressPostalCode, setAddresses, setError]);

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  const memoizedSetNearestWarehouse = useCallback((warehouse: Warehouse) => {
    setNearestWarehouse(warehouse);
  }, [setNearestWarehouse]);
  
  useEffect(() => {
    const nearest = findNearestWarehouse(defaultAddress, warehouses);
    if (nearest) {
      memoizedSetNearestWarehouse(nearest);
    } else {
      console.warn("No nearest warehouse found!");
    }
  }, [defaultAddress, warehouses, memoizedSetNearestWarehouse]);
  
  useEffect(() => {
    console.log("Selected address postal code:", addressPostalCode);
  }, [addressPostalCode]);  

  useEffect(() => {
    if (defaultAddress) {
      setAddressId(defaultAddress.addressId);
      setAddressPostalCode(defaultAddress.addressPostalCode);
    }
  }, [defaultAddress, setAddressId, setAddressPostalCode]);  

  const handleChangeAddress = () => {
    setShowPopup(true);
  };

  const handleSelectAddress = (address: Address) => {
    setDefaultAddress(address);
    setAddressId(address.addressId);
    setAddressPostalCode(address.addressPostalCode)
    setShowPopup(false);
  };

  if (loading) return <p className="text-gray-800">Loading address...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
      {defaultAddress ? (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <IoIosPin color="red" />
              <p className="font-semibold text-gray-900">{defaultAddress.label}</p>
            </div>
            <p className="text-gray-800">{defaultAddress.addressDetail}</p>
            {defaultAddress.note && <p className="text-gray-700 text-sm">{defaultAddress.note}</p>}
            {nearestWarehouse && (
              <p className="text-gray-700 text-sm">
                Nearest Warehouse: <strong>{nearestWarehouse.name}</strong> ({nearestWarehouse.address})
              </p>
            )}
          </div>
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full"
            onClick={handleChangeAddress}
          >
            Change
          </button>
        </div>
      ) : (
        <p className="text-gray-800">No address found.</p>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full md:w-[700px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Address</h3>
              <button onClick={() => setShowPopup(false)}>
                <IoMdClose size={28} color="red"/>
              </button>
            </div>
            {addresses.map((address) => (
              <div key={address.addressId} className="p-3 border-b border-gray-300">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-black">{address.label}</p>
                    <p className="text-gray-800">{address.addressDetail}</p>
                    {address.note && <p className="text-gray-700 text-sm">{address.note}</p>}
                  </div>
                  <button className="my-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => handleSelectAddress(address)}>
                    Choose
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressComponent;