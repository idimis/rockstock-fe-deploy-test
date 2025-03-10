export interface CartItem {
    cartItemId: number;
    quantity: number;
    totalAmount: number;
    cartId: number;
    productId: number;
    productName: string;
    productImage: string;
    productPrice: number;
    productWeight: number;
    productPictures: { productPictureUrl: string; position: number } | null;
}

export interface AddToCartButtonProps {
    productId: number;
    quantity: number;
}

export interface CartSummaryProps {
    totalPrice: number;
}