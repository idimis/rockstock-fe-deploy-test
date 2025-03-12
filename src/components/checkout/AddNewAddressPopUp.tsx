"use client";

import { getCitiesByProvinceId, getDistrictByCityId, getProvinces, getSubDistrictByDistrictId } from "@/services/addressService";
import { City, District, Province, SubDistrict } from "@/types/address";
import { useState, useEffect } from "react";

const AddNewAddressPopUp = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<SubDistrict | null>(null);

  // Fetch Provinces
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

  // Fetch Cities when Province changes
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

  // Fetch District when City changes
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

  // Fetch Sub District when District changes
  useEffect(() => {
    useEffect(() => {
      if (!selectedDistrict) return;
  
      const fetchSubDistricts = async () => {
        try {
          const subDistrictData = await getSubDistrictByDistrictId(selectedDistrict.id);
          setDistricts(subDistrictData);
        } catch (error) {
          console.error("Error fetching sub districts:", error);
        }
      };
  
      fetchSubDistricts();
    }, [selectedDistrict]);
  })

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
  
  return (
    <div>
      {/* Province Select */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Select Province:</label>
      <select
        value={selectedProvince?.id || ""}
        onChange={(e) => {
            const provinceId = parseInt(e.target.value, 10);
            const province = provinces.find((p) => p.id === provinceId) || null;
            setSelectedProvince(province);
            setSelectedCity(null);
            setCities([]);
        }}
        className="block w-full p-2 border rounded-md"
      >
        <option value="">Choose a Province</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      {/* City Select */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select City:</label>
      <select
        value={selectedCity?.id || ""}
        onChange={(e) => {
          const cityId = parseInt(e.target.value, 10); // Convert string to number
          const city = cities.find((c) => c.id === cityId) || null;
          setSelectedCity(city);
          setSelectedDistrict(null);
          setDistricts([]);
        }}
        className="block w-full p-2 border rounded-md"
        disabled={!selectedProvince}
      >
        <option value="">Choose a City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      {/* District Select */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select District:</label>
      <select
        value={selectedDistrict?.id || ""}
        onChange={(e) => {
          const districtId = parseInt(e.target.value, 10); // Convert string to number
          const district = districts.find((d) => d.id === districtId) || null;
          setSelectedDistrict(district);
          setSelectedSubDistrict(null);
          setSubDistricts([]);
        }}
        className="block w-full p-2 border rounded-md"
        disabled={!selectedCity}
      >
        <option value="">Choose a District</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      {/* Sub District Select */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Select Sub District:</label>
      <select
        value={selectedSubDistrict?.id || ""}
        onChange={(e) => {
          const subDistrictId = parseInt(e.target.value, 10); // Convert string to number
          const subDistrict = subDistricts.find((sd) => sd.id === subDistrictId) || null;
          setSelectedSubDistrict(subDistrict);
        }}
        className="block w-full p-2 border rounded-md"
        disabled={!selectedDistrict}
      >
        <option value="">Choose a Sub District</option>
        {subDistricts.map((subDistrict) => (
          <option key={subDistrict.id} value={subDistrict.id}>
            {subDistrict.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddNewAddressPopUp;
