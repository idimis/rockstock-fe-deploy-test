"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UserSidebarPanel from "@/components/common/UserSidebar";
import "leaflet/dist/leaflet.css"
// import L from "leaflet";
import axios from "axios";
import { City, District, Province, SubDistrict } from "@/types/address";
import { getCitiesByProvinceId, getDistrictByCityId, getProvinces, getSubDistrictByDistrictId } from "@/services/addressService";
import Select from "react-select";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Address {
  addressId: number;
  label: string;
  addressDetail: string;
  longitude: number;
  latitude: number;
  note: string;
  isMain: boolean;
  subDistrictId?: number
}

// const customMarkerIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AddressPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});
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
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

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
    setNewAddress((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };
  
  const fetchUserAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
  
    if (!userId || !token) {
      setError("You are not logged in");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/addresses/users`, {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.success && response.data.data) {
        setAddresses(
          response.data.data.sort((a: Address, b: Address) => Number(b.isMain) - Number(a.isMain))
        );
      } else {
        setError("Failed to retrieve address data");
      }
    } catch (err) {
      setError("Error fetching addresses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]); 
  
  useEffect(() => {
    if (userId) {
      fetchUserAddresses();
    }
  }, [userId, fetchUserAddresses]);

  const addNewAddress = async () => {
    if (!newAddress.label || !newAddress.addressDetail || !userLocation || !newAddress.subDistrictId) {
      setError("All fields are required");
      return;
    }
  
    const token = localStorage.getItem("accessToken");
    if (!userId || !token) return;
  
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/addresses`,
        { 
          ...newAddress, 
          userId, 
          latitude: userLocation.lat, 
          longitude: userLocation.lng 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserAddresses();
    } catch (err) {
      console.error("Failed to add new address", err);
    }
  };
  
  const setMainAddress = async (addressId: number) => {
    console.log("Setting main address, ID:", addressId);
  
    const token = localStorage.getItem("accessToken");
    if (!userId || !token) {
      console.error("User ID or token is missing!");
      return;
    }
  
    try {
      await axios.patch(
        `${BACKEND_URL}/api/v1/addresses/${addressId}/user/${userId}/set-main`, 
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );      
      console.log("Request success, refreshing addresses...");
      fetchUserAddresses();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to set main address:", err.response?.data);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };  
  

  // Update Address
  const updateAddress = async () => {
    if (!selectedAddress) return;
    const token = localStorage.getItem("accessToken");

    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/addresses/${selectedAddress.addressId}/user/${userId}`,
        selectedAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditModalOpen(false);
      fetchUserAddresses();
    } catch (err) {
      console.error("Failed to update address", err);
    }
  };

  // Delete Address
  const deleteAddress = async (addressId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!userId || !token) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/addresses/soft-delete/${addressId}/user/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserAddresses();
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <Header />
      <Navbar />
      <div className="flex flex-grow">
        <UserSidebarPanel />
        <main className="flex-grow p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-4">📍 My Addresses</h1>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Label"
              onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Address Detail"
              onChange={(e) => setNewAddress({ ...newAddress, addressDetail: e.target.value })}
            />
            <div>
              {/* Province Select */}
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

              {/* City Select */}
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
                className="mt-2"
                isDisabled={!selectedProvince}
              />

              {/* District Select */}
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
                className="mt-2"
                isDisabled={!selectedCity}
              />

              {/* Sub District Select */}
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select Sub District:</label>
              <Select
                options={subDistrictOptions}
                value={selectedSubDistrict ? { value: selectedSubDistrict.id, label: selectedSubDistrict.name } : null}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    const subDistrictId = selectedOption.value
                    setNewAddress({ ...newAddress, subDistrictId})
                    const subDistrict = subDistricts.find((s) => s.id === selectedOption.value) || null;
                    setSelectedSubDistrict(subDistrict);
                  }
                }}
                placeholder="Search and select a sub-district..."
                isSearchable
                className="mt-2"
                isDisabled={!selectedDistrict}
              />
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addNewAddress}>
              Save
            </button>
          </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="p-4 bg-gray-50 shadow-md rounded-xl border border-gray-200">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                <Map 
                  latitude={userLocation?.lat || 0} 
                  longitude={userLocation?.lng || 0} 
                  setCoordinates={handleMapClick} 
                />

                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <li
                      key={address.addressId}
                      className={`mt-2 p-4 rounded-xl border shadow-sm hover:shadow-md transition ${
                        address.isMain ? "bg-yellow-50 border-yellow-400" : "bg-white border-gray-300"
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{address.label}</h3>
                        <p className="text-gray-700 text-md">{address.addressDetail}</p>
                        <p className="text-sm font-medium text-gray-600">
                          {address.isMain ? "✅ Main Address" : "Secondary Address"}
                        </p>
                      </div>
                      <div className="mt-3 flex gap-3">
                        {!address.isMain && (
                          <button
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition hover:scale-105"
                            onClick={() => setMainAddress(address.addressId)}
                          >
                            Set as Main
                          </button>
                        )}
                        <button
                          className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition hover:scale-105"
                          onClick={() => {
                            setSelectedAddress(address);
                            setEditModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition hover:scale-105"
                          onClick={() => deleteAddress(address.addressId)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No addresses found</p>
                )}
              </ul>
            )}
          </div>
        </main>
    </div>
    <Footer />
  
      {editModalOpen && selectedAddress && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Label"
              value={selectedAddress.label}
              onChange={(e) => setSelectedAddress({ ...selectedAddress, label: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Address Detail"
              value={selectedAddress.addressDetail}
              onChange={(e) => setSelectedAddress({ ...selectedAddress, addressDetail: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Longitude"
              value={selectedAddress.longitude}
              onChange={(e) => setSelectedAddress({ ...selectedAddress, longitude: parseFloat(e.target.value) })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Latitude"
              value={selectedAddress.latitude}
              onChange={(e) => setSelectedAddress({ ...selectedAddress, latitude: parseFloat(e.target.value) })}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={updateAddress}>
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;