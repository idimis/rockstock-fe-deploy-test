export interface QuantitySelectorProps {
    productId: number;
    totalStock: number;
    price: number;
  }

  export interface Product {
    productCategory: string;
    pictures(pictures: ProductPicture[]): unknown;
    categoryId: number;
    productId: number;
    productName: string;
    detail: string;
    price: number;
    weight: number;
    totalStock: number;
    categoryName: string;
    productPictures: ProductPicture[];
    status: ProductStatus;
  }
  
  export interface ProductPicture{
    productPictureUrl: string;
    position: number;
  }
  
  export enum ProductStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
  }
  
  export interface Category {
    categoryId: number;
    categoryName: string;
    categoryPicture: string;
  }
  
  export interface CategoriesResponse {
    content: Category[];
    totalPages: number;
  }
  
  export interface ProductFormValues {
    productName: string;
    detail: string;
    price: number;
    weight: number;
    productCategory: string;
    productPictures: (string | null)[];
  }
  
  export interface CategoryFormData {
    categoryName: string;
    file: File | null;
  }
  
  export interface ApiErrorResponse {
    message?: string;
  }
  
  export interface ApiResponse {
    content: Product[];
    totalPages: number;
    number: number;
  }
