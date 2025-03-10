import axios from "axios";
import { getAccessToken } from "@/lib/utils/auth";
import { PaymentMethod } from "@/types/payment";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPaymentMethods = async (attempt = 1) => {
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
        if (errorMessage.includes("JDBC") && attempt < 5) {
            const retryDelay = Math.min(2 ** attempt * 1000, 30000); // Exponential backoff (max 30s)
            console.warn(`Retrying fetchPaymentMethods in ${retryDelay / 1000}s...`);
            setTimeout(() => fetchPaymentMethods(attempt + 1), retryDelay);
        } else {
            console.log("Unknown Error Fetcing Payment Methods!");
        }
    } 
};