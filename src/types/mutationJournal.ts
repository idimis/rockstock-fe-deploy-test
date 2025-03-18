export interface MutationJournalResponse {
    content: MutationJournal[];
    totalPages: number;
  }
  
  export interface MutationJournal {
    originWarehouseId: number;
    destinationWarehouseId: number;
    newStockQuantity: number;
    previousStockQuantity: number;
    warehouseStockId: number;
    journalId: number;
    productName: string;
    originWarehouse: string;
    destinationWarehouse: string;
    mutationQuantity: number;
    stockAdjustmentType: StockAdjustmentType;
    stockChangeType: StockChangeType;
    mutationStatus: MutationStatus;
    updatedAt: string;
    description: string;
    warehouseId: number;
  }
  
  export enum StockChangeType {
    PURCHASE_RECEIVED = "PURCHASE_RECEIVED",
    CUSTOMER_RETURN = "CUSTOMER_RETURN",
    SALES_DISPATCHED = "SALES_DISPATCHED",
    RETURN_TO_SUPPLIER = "RETURN_TO_SUPPLIER",
    STOCK_ADJUSTMENT = "STOCK_ADJUSTMENT",
    DAMAGED_OR_EXPIRED = "DAMAGED_OR_EXPIRED",
    TRANSFER = "TRANSFER",
  }
  
  export enum MutationStatus {
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    COMPLETED = "COMPLETED",
    ON_DELIVERY = "ON_DELIVERY",
  }
  
  export enum StockAdjustmentType {
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE",
  }