import { Warehouse } from "./warehouse";

export interface Address {
    addressId: number;
    label: string;
    addressDetail: string;
    latitude: string;
    longitude: string;
    note?: string;
    isMain: boolean;
    addressPostalCode: string;
}
  
export interface AddressComponentProps {
    addressId: number | null;
    setAddressId: (id: number) => void;
    addressPostalCode: string | null;
    setAddressPostalCode: (addressPostalCode: string) => void;
    nearestWarehouse: Warehouse | null;
    setNearestWarehouse: (warehouse: Warehouse | null) => void;
}

export interface Province {
    id: number;
    name: string; 
}

export interface City {
    id: number;
    name: string; 
}

export interface District {
    id: number;
    name: string; 
}

export interface SubDistrict {
    id: number;
    name: string; 
    postalCode: string;
}
