export interface PaymentMethod {
    id: number;
    name: string;
  }
  
  export interface DetailPaymentProps {
    subtotal: number;
    shippingFee: number;
    totalPrice: number;
    onShowPopup: () => void;
    paymentMethods: PaymentMethod[];
    setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
    selectedMethod: number | null;
    setSelectedMethod: (id: number) => void;
  }
  
  export type MidtransPaymentResult = {
    order_id: string;
    transaction_status: string;
    fraud_status?: string;
  };
  
  export type OrderResponse = {
    id: number;
    transactionToken: string;
  };