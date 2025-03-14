export interface Stock {
  stockId: number;
  stockQuantity: number;
  lockedQuantity: number;
  productName: string;
  productId: number;
  warehouseName: string;
  warehouseId: number;
  availableQuantity: number;
  productPictureUrl: string;
}

export interface ApiErrorResponse {
  message?: string;
}

export interface StockFormData {
  productName: string;
  warehouseId: number;
  quantity: number;
  file: File | null;
  productId: number;
}

export interface StocksResponse {
  content: Stock[];
  totalPages: number;
}