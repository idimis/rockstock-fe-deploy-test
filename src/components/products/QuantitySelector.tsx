import { useState } from "react";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import { QuantitySelectorProps } from "@/types/product";

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ productId, totalStock, price }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < totalStock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const subtotal = price * quantity;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {totalStock === 0 ? (
        <p className="text-red-600 font-bold">Product Not Available</p>
      ) : (
        <>
          <h5 className="font-semibold mb-4 text-black">Set the number of products to be purchased</h5>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 border border-red-600 rounded-full  w-fit px-2 py-0.5">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className={`px-3 py-1 ${quantity <= 1 ? "text-gray-600 cursor-not-allowed" : "text-red-600 hover:bg-gray-200 hover:rounded-full"}`}
              >
                -
              </button>
              <span className="text-black px-4">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= totalStock}
                className={`px-3 py-1 ${quantity >= totalStock ? "text-gray-600 cursor-not-allowed" : "text-red-600 hover:bg-gray-200 hover:rounded-full"}`}
              >
                +
              </button>
            </div>
            <div>
              <p className="text-gray-700">Stock: {totalStock}</p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <p className="text-gray-700">Subtotal:</p>
            <p className="text-black font-semibold">Rp. {subtotal.toLocaleString("id-ID")}</p>
          </div>

          <AddToCartButton productId={productId} quantity={quantity} />
        </>
      )}
    </div>
  );
};

export default QuantitySelector;