import axios from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { Address } from "@/types/address";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAddresses = async (attempt = 1): Promise<Address[]> => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("No access token available");

  try {
    const response = await axios.get<{ data: Address[] }>(`${API_BASE_URL}/addresses`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
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