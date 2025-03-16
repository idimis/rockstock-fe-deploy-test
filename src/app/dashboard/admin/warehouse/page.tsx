"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AdminSidebarPanel from "@/components/common/AdminSidebar";
import axios from "axios";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Warehouse } from "@/types/warehouse";
import {
  getProvinces,
  getCitiesByProvinceId,
  getDistrictByCityId,
  getSubDistrictByDistrictId,
} from "@/services/addressService";
import Select from "react-select";
import { City, District, Province, SubDistrict } from "@/types/address";


const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newWarehouse, setNewWarehouse] = useState<Partial<Warehouse>>({});
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<SubDistrict | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinceData = await getProvinces();   
        setProvinces(provinceData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;
    const fetchCities = async () => {
      try {
        const cityData = await getCitiesByProvinceId(selectedProvince.id);
        setCities(cityData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedCity) return;
    const fetchDistricts = async () => {
      try {
        const districtData = await getDistrictByCityId(selectedCity.id);
        setDistricts(districtData);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchSubDistricts = async () => {
      try {
        const subDistrictData = await getSubDistrictByDistrictId(selectedDistrict.id);
        setSubDistricts(subDistrictData);
      } catch (error) {
        console.error("Error fetching sub districts:", error);
      }
    };

    fetchSubDistricts();
  }, [selectedDistrict]);

  const provinceOptions = provinces.map((province) => ({
    value: province.id,
    label: province.name,
  }));
  
  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));
  
  const districtOptions = districts.map((district) => ({
    value: district.id,
    label: district.name,
  }));
  
  const subDistrictOptions = subDistricts.map((subDistrict) => ({
    value: subDistrict.id,
    label: subDistrict.name,
  }));

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setNewWarehouse((prev) => ({
      ...prev,
      latitude: lat.toString(),  
      longitude: lng.toString(), 
    }));
  };

  const fetchWarehouses = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    console.log("Fetching warehouses...");
    console.log("Token:", token);

    if (!token) {
      setError("You are not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/warehouses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setWarehouses(response.data);
        console.log("Warehouses set:", response.data);
      } else {
        setError("Failed to retrieve warehouse data");
        console.error("Unexpected response format:", response.data);
      }
    } catch (err) {
      setError("Error fetching warehouses");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  const createWarehouse = async () => {
    console.log("Creating warehouse with data:", newWarehouse); 
    console.log("Final warehouse data before sending:", newWarehouse);
    console.log("SubDistrict ID:", newWarehouse.subDistrictId);
      if (!newWarehouse.name ||  !newWarehouse.address || !newWarehouse.latitude || !newWarehouse.longitude || !newWarehouse.subDistrictId) {
        setError("All fields are required");
        return;
      }
      
    
      const token = localStorage.getItem("accessToken");
      if (!token) return;
    
      try {
        await axios.post(
          `${BACKEND_URL}/api/v1/warehouses`,
          { 
            name: newWarehouse.name,
            address: newWarehouse.address, 
            latitude: newWarehouse.latitude.toString(),
            longitude: newWarehouse.longitude.toString(), 
            subDistrictId: newWarehouse.subDistrictId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchWarehouses();
      } catch (err) {
        console.error("Failed to create warehouse", err);
      }
    };
    
  
  
  const updateWarehouse = async () => {
    try {
      if (editingWarehouse) {
        console.log("Updating warehouse with data:", editingWarehouse);
        await axios.put(
          `${BACKEND_URL}/api/v1/warehouses/${editingWarehouse.id}`,
          {
            ...editingWarehouse,
            latitude: editingWarehouse.latitude.toString(), 
            longitude: editingWarehouse.longitude.toString(),
          }
        );
        setEditingWarehouse(null);
      }
      fetchWarehouses();
    } catch (err) {
      console.error("Failed to update warehouse", err);
    }
  };
  
  
  const deleteWarehouse = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/warehouses/${id}`);
      fetchWarehouses();
    } catch (err) {
      console.error("Failed to delete warehouse", err);
    }
  };
  


  return (
      <div className="flex min-h-screen flex-col bg-gray-100 text-black">
        <Header />
        <Navbar />
        <div className="flex flex-grow">
          <AdminSidebarPanel />
          <main className="flex-grow p-6 bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">🏭 Warehouse Management</h1>
  
            {/* Form Add/Edit Warehouse */}
            <section className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                {editingWarehouse ? "📌 Edit Warehouse" : "➕ Add Warehouse"}
              </h2>
              {error && <p className="text-red-500">{error}</p>}
  
              {/* Warehouse Name Input */}
              <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Warehouse Name"
                value={editingWarehouse?.name ?? newWarehouse.name ?? ""}
                onChange={(e) =>
                  editingWarehouse
                    ? setEditingWarehouse({ ...editingWarehouse, name: e.target.value })
                    : setNewWarehouse({ ...newWarehouse, name: e.target.value })
                }
              />

            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Address Detail"
              onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
            />
  
              {/* Province Selection */}
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Province:</label>
              <Select
                options={provinceOptions}
                value={selectedProvince ? { value: selectedProvince.id, label: selectedProvince.name } : null}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    const province = provinces.find((p) => p.id === selectedOption.value) || null;
                    setSelectedProvince(province);
                    setSelectedCity(null);
                    setCities([]);
                  }
                }}
                placeholder="Search and select a province..."
                isSearchable
                className="mt-2"
              />
  
              {/* City Selection */}
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select City:</label>
              <Select
                options={cityOptions}
                value={selectedCity ? { value: selectedCity.id, label: selectedCity.name } : null}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    const city = cities.find((c) => c.id === selectedOption.value) || null;
                    setSelectedCity(city);
                    setSelectedDistrict(null);
                    setDistricts([]);
                  }
                }}
                placeholder="Search and select a city..."
                isSearchable
                isDisabled={!selectedProvince}
                className="mt-2"
              />
  
              {/* District Selection */}
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select District:</label>
              <Select
                options={districtOptions}
                value={selectedDistrict ? { value: selectedDistrict.id, label: selectedDistrict.name } : null}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    const district = districts.find((d) => d.id === selectedOption.value) || null;
                    setSelectedDistrict(district);
                    setSelectedSubDistrict(null);
                    setSubDistricts([]);
                  }
                }}
                placeholder="Search and select a district..."
                isSearchable
                isDisabled={!selectedCity}
                className="mt-2"
              />

              {/* Sub District Select */}
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select Sub District:</label>
              <Select
                options={subDistrictOptions}
                value={selectedSubDistrict ? { value: selectedSubDistrict.id, label: selectedSubDistrict.name } : null}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    const subDistrictId = selectedOption.value
                    setNewWarehouse({ ...newWarehouse, subDistrictId})
                    const subDistrict = subDistricts.find((s) => s.id === selectedOption.value) || null;
                    setSelectedSubDistrict(subDistrict);
                  }
                }}
                placeholder="Search and select a sub-district..."
                isSearchable
                className="mt-2"
                isDisabled={!selectedDistrict}
              />
  
                  {/* Map Selection */}
                  <h2 className="text-lg font-semibold mt-6">📍 Select Location</h2>
                  <Map 
                    latitude={userLocation?.lat || 0} 
                    longitude={userLocation?.lng || 0} 
                    setCoordinates={handleMapClick} 
                  />

  
              {/* Submit Button */}
              <button
                className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                onClick={editingWarehouse ? updateWarehouse : createWarehouse}
              >
                {editingWarehouse ? "Update Warehouse" : "Add Warehouse"}
              </button>
            </section>
  
      {/* Warehouse List */}
      <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white mt-6">
        <h2 className="text-xl font-semibold mb-4">📋 Warehouse List</h2>
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {warehouses.map((warehouse) => (
              <li
                key={warehouse.id}
                className="p-4 bg-white rounded-lg shadow mb-2 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{warehouse.name}</h3>
                  <p className="text-gray-600">
                    {warehouse.subDistrictId}, {warehouse.address},
                  </p>
                </div>
                <div>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 mr-2"
                    onClick={() => {
                      setEditingWarehouse(warehouse);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                    onClick={() => deleteWarehouse(warehouse.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {isModalOpen && editingWarehouse && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Edit Warehouse</h2>
      <input
        type="text"
        placeholder="Warehouse Name"
        className="border p-3 w-full rounded-lg mb-2"
        value={editingWarehouse.name}
        onChange={(e) =>
          setEditingWarehouse({ ...editingWarehouse, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Address"
        className="border p-3 w-full rounded-lg mb-2"
        value={editingWarehouse.address}
        onChange={(e) =>
          setEditingWarehouse({ ...editingWarehouse, address: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Longitude"
        className="border p-3 w-full rounded-lg mb-2"
        value={editingWarehouse.longitude}
        onChange={(e) =>
          setEditingWarehouse({ ...editingWarehouse, longitude: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Latitude"
        className="border p-3 w-full rounded-lg mb-2"
        value={editingWarehouse.latitude}
        onChange={(e) =>
          setEditingWarehouse({ ...editingWarehouse, latitude: e.target.value })
        }
      />
      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            updateWarehouse();
            setIsModalOpen(false);
          }}
        >
          Save
            </button>
            </div>
          </div>       
        </div>  
      )}
      </main>
        </div>
        <Footer /> 
      </div>
      
    );
  };
  
  export default WarehousePage;