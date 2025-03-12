import axios from "axios";
import { Warehouse } from "@/types/warehouse";
import { getAccessToken } from "@/lib/utils/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchWarehouses = async (attempt = 1): Promise<{ warehouses: Warehouse[] }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/warehouses`);
    return { warehouses: response.data || [] };
  } catch (err: unknown) {
    const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message || (err as Error).message;

    console.error(`Attempt ${attempt}: Failed to fetch warehouses - ${errorMessage}`);

    // Hanya retry jika error mengandung "JDBC" dan percobaan masih di bawah 5
    // if (errorMessage.includes("JDBC") && attempt < 5) {
    //   const retryDelay = Math.min(2 ** attempt * 1000, 30000);
    //   console.warn(`Retrying fetchWarehouses in ${retryDelay / 1000}s... (Attempt ${attempt + 1}/5)`);

    //   await new Promise((resolve) => setTimeout(resolve, retryDelay));
    //   return fetchWarehouses(attempt + 1);
    // }

    // throw new Error(`Failed to fetch warehouses after ${attempt} attempts`);
    throw new Error(`Failed to fetch warehouses`);
  }
};

export const fetchWHAdminWarehouses = async (attempt = 1): Promise<{ warehouses: Warehouse[] }> => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.get(`${API_BASE_URL}/warehouses/warehouse-admin`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    return {warehouses: response.data || []};
  } catch (err: unknown) {
    const errorMessage = (err as unknown as { 
      response?: { data?: { message?: string } } 
    }).response?.data?.message || (err as Error).message;  
      
    console.error(`Attempt ${attempt}: Failed to fetch warehouses - ${errorMessage}`);
    if (errorMessage.includes("JDBC") && attempt < 5) {
      const retryDelay = Math.min(2 ** attempt * 1000, 30000);
      console.warn(`Retrying fetchWHAdminWarehouses in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return fetchWHAdminWarehouses(attempt + 1);
    }

    throw new Error("Failed to fetch warehouses");
  }
};
