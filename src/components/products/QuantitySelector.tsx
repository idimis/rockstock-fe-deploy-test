import { useState } from "react";

interface QuantitySelectorProps {
  productId: number;
  totalStock: number;
  price: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ totalStock, price }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < totalStock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const subtotal = price * quantity;

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      {totalStock === 0 ? (
        <p className="text-red-600 font-bold text-center">Product Not Available</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-gray-700 text-sm">Total Stock: {totalStock}</p>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <button 
              onClick={decreaseQuantity} 
              disabled={quantity <= 1} 
              className="px-3 py-1 border rounded-md bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="text-gray-600 text-lg">{quantity}</span>
            <button 
              onClick={increaseQuantity} 
              disabled={quantity >= totalStock} 
              className="px-3 py-1 border rounded-md bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              +
            </button>
          </div>

          {/* Subtotal Line: Left label, Right-aligned price */}
          <div className="flex justify-between mt-3">
            <p className="text-gray-700">Subtotal:</p>
            <p className="text-gray-800 font-semibold">Rp. {subtotal.toLocaleString("id-ID")}</p>
          </div>

          <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default QuantitySelector;