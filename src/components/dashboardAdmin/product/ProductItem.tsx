import { useState } from "react";
import Image from "next/image";
import { MdEdit, MdDelete, MdArrowBack, MdArrowForward } from "react-icons/md";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { AxiosError } from "axios";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch(`/products/${product.productId}/delete`, {
        productId: product.productId,
      });
    },
    onSuccess: () => {
      localStorage.setItem("toastMessage", "Product deleted successfully!");
      window.location.reload();
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to delete product";
      toast.error(errorMessage);
    },
    
  });

  const onEdit = () => {
    router.push(`/dashboard/admin/products/edit/${product.productId}`);
  };

  const handleNextImage = () => {
    if (product.productPictures && product.productPictures.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.productPictures.length);
    }
  };

  const handlePrevImage = () => {
    if (product.productPictures && product.productPictures.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + product.productPictures.length) % product.productPictures.length
      );
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-x-6">
      <div className="relative w-40 h-40 flex-shrink-0">
        {product.productPictures && product.productPictures.length > 0 ? (
          <>
            <Image
              src={product.productPictures[currentImageIndex].productPictureUrl}
              alt={product.productName}
              width={300}
              height={300}
              className="object-cover rounded-lg w-full h-full"
            />
            {product.productPictures.length > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                  onClick={handlePrevImage}
                >
                  <MdArrowBack />
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                  onClick={handleNextImage}
                >
                  <MdArrowForward />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            No Image
          </div>
        )}
      </div>

      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-900">{product.productName}</h3>
        <p className="text-sm text-blue-600">{product.categoryName}</p>
        <p className="text-sm text-gray-700">Weight: {product.weight}g</p>
        <p className="text-sm font-semibold text-gray-900">
          Price: Rp {product.price.toLocaleString()}
        </p>
        <p className="text-md text-gray-700 mt-2">{product.detail}</p>
      </div>

      <div className="flex items-center text-center gap-2">
        <p className="text-lg font-semibold text-gray-800">Total Stock:</p>
        <p className="text-lg font-bold text-gray-900">{product.totalStock}</p>
      </div>

      <div className="flex space-x-4">
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          onClick={onEdit}
          >
          <MdEdit className="text-xl" />
          <span className="hidden md:inline">Edit</span>
        </button>
        <button
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
          onClick={() => setIsConfirmOpen(true)}
        >
          <MdDelete className="text-xl" />
          <span className="hidden md:inline">Delete</span>
        </button>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg w-1/2 sm:w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Do you really want to delete this product?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm"}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;