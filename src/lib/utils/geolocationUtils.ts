import { Address } from "@/types/address";
import { Warehouse } from "@/types/warehouse";

export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const findNearestWarehouse = (defaultAddress: Address | null, warehouses: Warehouse[]): Warehouse | null => {
  if (!defaultAddress || warehouses.length === 0) return null;

  const { latitude, longitude } = defaultAddress;
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  let nearest: Warehouse | null = null;
  let minDistance = Infinity;

  warehouses.forEach((warehouse) => {
    const warehouseLat = parseFloat(warehouse.latitude);
    const warehouseLon = parseFloat(warehouse.longitude);
    const distance = haversineDistance(userLat, userLon, warehouseLat, warehouseLon);

    if (distance < minDistance) {
      minDistance = distance;
      nearest = warehouse;
    }
  });

  return nearest;
};