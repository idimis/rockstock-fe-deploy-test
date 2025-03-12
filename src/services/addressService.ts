import axios from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { Address, City, District, Province, SubDistrict } from "@/types/address";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAddresses = async (attempt = 1): Promise<Address[]> => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("No access token available");

  try {
    const response = await axios.get<{ data: Address[] }>(`${API_BASE_URL}/addresses`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data?.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    console.error(`Attempt ${attempt}: Failed to fetch addresses - ${errorMessage}`);

    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying getAddresses in ${retryDelay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return getAddresses(attempt + 1);
    }

    throw new Error(errorMessage);
  }
};

export const getProvinces = async (attempt = 1): Promise<Province[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/geolocations/provinces/all`);
    return response.data?.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    console.error(`Attempt ${attempt}: Failed to fetch provinces - ${errorMessage}`);

    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying getProvinces in ${retryDelay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return getProvinces(attempt + 1);
    }

    throw new Error(errorMessage);
  }
};

export const getCitiesByProvinceId = async (provinceId: number, attempt = 1): Promise<City[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/geolocations/cities/provinces`, {
      params: { provinceId }
    });
    return response.data?.data
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    console.error(`Attempt ${attempt}: Failed to fetch cities - ${errorMessage}`);

    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying getCitiesByProvince in ${retryDelay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return getCitiesByProvinceId(attempt + 1);
    }

    throw new Error(errorMessage);
  }
};

export const getDistrictByCityId = async (cityId: number, attempt = 1): Promise<District[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/geolocations/districts/cities`, {
      params: { cityId }
    });
    return response.data?.data
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    console.error(`Attempt ${attempt}: Failed to fetch districts - ${errorMessage}`);

    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying getDistrictByCityId in ${retryDelay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return getDistrictByCityId(attempt + 1);
    }

    throw new Error(errorMessage);
  }
};

export const getSubDistrictByDistrictId = async (districtId: number, attempt = 1): Promise<SubDistrict[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/geolocations/sub-districts/districts`, {
      params: { districtId }
    });
    return response.data?.data
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    console.error(`Attempt ${attempt}: Failed to fetch sub districts - ${errorMessage}`);

    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying getSubDistrictByDistrictId in ${retryDelay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return getSubDistrictByDistrictId(attempt + 1);
    }

    throw new Error(errorMessage);
  }
};