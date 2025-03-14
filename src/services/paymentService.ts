import axios from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { PaymentMethod } from "@/types/payment";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPaymentMethods = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("Unauthorized: No token provided");
    }

    try {
      const response = await axios.get<{ data: PaymentMethod[] }>(
        `${API_BASE_URL}/payments/methods`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      return response.data.data;
    } catch (err: unknown) {
      const errorMessage = (err as unknown as { 
          response?: { data?: { message?: string } } 
      }).response?.data?.message || (err as Error).message;
      console.log("Unknown Error Fetcing Payment Methods!", errorMessage);

    } 
};