import Image from "next/image";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: Product;
}

const ProductsItem: React.FC<ProductItemProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.productId}`);
  };

  return (
    <div 
      className="bg-white p-3 rounded-lg shadow-md flex flex-col border w-full h-full cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
      onClick={handleClick}
    >
      <div className="relative w-full h-40 md:h-48 flex justify-center items-center overflow-hidden">
        {product.productPictures && product.productPictures.length > 0 ? (
          <Image
            src={product.productPictures[0].productPictureUrl}
            alt={product.productName}
            width={200}
            height={200}
            className="object-cover rounded-md w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-md text-sm md:text-base">
            No Image
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col space-y-1 flex-grow">
        <p className="text-xs md:text-lg text-gray-500">{product.categoryName}</p>
        <h3 className="text-sm md:text-xl font-medium text-gray-900 min-h-[3rem] flex items-center">
          {product.productName}
        </h3>
        <p className="text-md md:text-lg font-semibold text-gray-900">
          Rp {product.price.toLocaleString()}
        </p>
        <p className="text-xs md:text-lg text-gray-700">Stock: {product.totalStock}</p>
      </div>
    </div>
  );
};

export default ProductsItem;