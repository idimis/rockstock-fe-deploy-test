import { getAddresses } from "@/services/addressService";
import { Address } from "@/types/address";

export const fetchAddresses = async (
  setDefaultAddress: (address: Address | null) => void,
  setAddressId: (id: number) => void,
  setAddressPostalCode: (postalCode: string) => void,
  setAddresses: (addresses: Address[]) => void,
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    const addressList = await getAddresses();
    setAddresses(addressList);

    if (Array.isArray(addressList)) {
      const mainAddress = addressList.find((addr: Address) => addr.isMain) || addressList[0];
      if (mainAddress) {
        setDefaultAddress(mainAddress);
        setAddressId(mainAddress.addressId);
        setAddressPostalCode(mainAddress.addressPostalCode);
      }
    } else {
      throw new Error("Invalid API response format: 'data' is not an array");
    }
    setLoading(false);
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    setError("Failed to fetch addresses");
    setLoading(false);
  }
};