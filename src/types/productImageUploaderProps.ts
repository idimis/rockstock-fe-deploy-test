export interface ProductImageUploaderProps {
  productId: string;
}

export interface Image {
  position: number;
  productPictureUrl: string | null;
  pictureId: number | null;
}

export interface LoadingState {
  [key: number]: boolean;
}  