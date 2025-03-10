import { statusColors } from "@/constants/statusColors";
import { Warehouse } from "@/types/warehouse";
import { CartItem } from "@/types/cart";
import { DecodedToken } from "@/types/token";

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  productName: string;
  productDetail: string;
  productWeight: number;
  productPicture: { productPictureUrl: string; position: number } | null;
}
  
export interface Order {
  orderId: number;
  orderCode: string;
  paymentProof: string | null;
  formattedCreatedAt: string;
  status: keyof typeof statusColors;
  totalPrice: number;
  deliveryCost: number;
  totalPayment: number;
  paymentMethod: string;
  firstOrderItem: OrderItem | null;
}

export interface CustomerOrderCardProps {
  order: Order;
  onOpenDetail: (order: Order) => void;
  onUploadPaymentProof: (order: Order) => void;
  onCancel: (order: Order) => void;
  onComplete: (order: Order) => void;
}

export interface AdminOrderCardProps {
  decoded: DecodedToken | null;
  order: Order;
  onOpenDetail: (order: Order) => void;
  onOpenPaymentProof: (order: Order) => void;
  onRejectPaymentProof: (order: Order) => void;
  onApprovePaymentProof: (order: Order) => void;
  onDeliverOrder: (order: Order) => void;
  onCancel: (order: Order) => void;
}

export interface OrderDetailPopupProps {
  order: Order;
  orderItems: OrderItem[];
  isLoading: boolean;
  onClose: () => void;
}

export interface OrderFilterProps {
  filters: {
    status: string | null;
    startDate: string | null;
    endDate: string | null;
    warehouseId: string | null;
    sortBy: string | null;
    sortOrder: "asc" | "desc" | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<OrderFilterProps["filters"]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  warehouses: Warehouse[];
}

export interface OrderSummaryProps {
  cartItems: CartItem[];
}