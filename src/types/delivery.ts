export interface DeliveryService {
    service: string;
    description: string;
    cost: number;
    etd: string;
  }
  
  export interface DeliveryServiceProps {
    origin: string | null;
    destination: string | null;
    weight: number;
    setShippingFee: (cost: number) => void;
  }