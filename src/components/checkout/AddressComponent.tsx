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
import CreateAddress from "@/components/address/CreateAddress";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const accessToken = getAccessToken();

const AddressComponent: React.FC<AddressComponentProps> = ({ 
  setAddressId, setAddressPostalCode, 
  nearestWarehouse, setNearestWarehouse
}) => {
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshAddresses, setRefreshAddresses] = useState(false);

  const fetchWarehouses = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses`);
      const warehouseList = response.data;
      setWarehouses(warehouseList);
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An unknown error occurred";
      setError("Failed to fetch warehouses");
      console.log(errorMessage);
    }
  }, []);
  
  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    fetchAddresses(setDefaultAddress, setAddressId, setAddressPostalCode, setAddresses, setError, setLoading);
  }, [refreshAddresses, setAddressId, setAddressPostalCode, setAddresses, setError]);

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

  const handleOpenCreateAddress = () => {
    setShowPopup(false);
    setShowCreateAddress(true);
  }

  const handleCloseCreateAddress = () => {
    setShowPopup(true);
    setShowCreateAddress(false);
    setRefreshAddresses((prev) => !prev); 
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <p className="mt-2 text-gray-800 font-semibold">Getting Address Data...</p>
          </div>
        </div>
      ) : defaultAddress ? (
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
        <div className="flex items-center justify-between">
          <p className="text-gray-800">No address found.</p>
          <button 
            className="my-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
            onClick={handleOpenCreateAddress}
          >
            + Add New Address
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full md:w-[700px] max-h-[80vh] flex flex-col">

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Select Address</h3>
              <button onClick={() => setShowPopup(false)}>
                <IoMdClose size={28} color="red" />
              </button>
            </div>

            <button 
              className="my-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
              onClick={handleOpenCreateAddress}
            >
              + Add New Address
            </button>

            <div className="overflow-y-auto max-h-[50vh]">
              {addresses.map((address) => (
                <div key={address.addressId} className="p-3 border-b border-gray-300">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-black">{address.label}</p>
                      <p className="text-gray-800">{address.addressDetail}</p>
                      {address.note && <p className="text-gray-700 text-sm">{address.note}</p>}
                    </div>
                    <button
                      className="my-auto px-4 py-1 bg-red-500 text-white font-semibold rounded-lg"
                      onClick={() => handleSelectAddress(address)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCreateAddress && (
        <CreateAddress onCloseCreateAddress={handleCloseCreateAddress} />
      )}
    </div>
  );
};

export default AddressComponent;