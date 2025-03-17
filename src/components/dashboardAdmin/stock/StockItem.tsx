import { useState } from "react";
import Image from "next/image";
import { MdEdit, MdDelete } from "react-icons/md";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Stock } from "@/types/stock";
import RequestStockModal from "@/components/dashboardAdmin/stock/RequestModal";

interface StockItemProps {
  stock: Stock;
  onEdit: (stock: Stock) => void;
}

const StockItem: React.FC<StockItemProps> = ({ stock, onEdit }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch(`/stocks/${stock.stockId}/delete`, {
        stockId: stock.stockId,
      });
    },
    onSuccess: () => {
      toast.success("Stock deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to delete stock";
      toast.error(errorMessage);
    },
  });

  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-gray-100 p-6 rounded-lg shadow-sm w-full">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-white border">
        <Image
          src={stock.productPictureUrl}
          alt={stock.productName}
          width={400}
          height={400}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>

      <div className="mt-4 lg:mt-0 lg:ml-4 flex-1">
        <p className="text-lg lg:text-2xl font-medium text-gray-800 text-center lg:text-left">
          {stock.productName}
        </p>
        <p className="text-md text-gray-600 text-center lg:text-left">
          Available: {stock.availableQuantity}
        </p>
        <p className="text-md text-gray-600 text-center lg:text-left">
          Locked: {stock.lockedQuantity}
        </p>
        <p className="text-sm text-gray-500 text-center lg:text-left">
          {stock.warehouseName}
        </p>
      </div>

      <div className="flex lg:ml-auto space-x-4 lg:space-x-8 mt-4 lg:mt-0">
        <button
          className="flex items-center gap-2 lg:gap-3 text-lg lg:text-xl text-blue-600 hover:text-blue-800 transition"
          onClick={() => onEdit(stock)}
        >
          <MdEdit className="text-xl lg:text-2xl" />
          <span className="hidden xl:inline">Adjust Stock</span>
        </button>
        <button
          className="flex items-center gap-2 lg:gap-3 text-lg lg:text-xl text-green-600 hover:text-green-800 transition"
          onClick={() => setIsRequestModalOpen(true)}
        >
          <MdEdit className="text-xl lg:text-2xl" />
          <span className="hidden xl:inline">Request Stock</span>
        </button>
        <button
          className="flex items-center gap-2 lg:gap-3 text-lg lg:text-xl text-red-600 hover:text-red-800 transition"
          onClick={() => setIsConfirmOpen(true)}
        >
          <MdDelete className="text-xl lg:text-2xl" />
          <span className="hidden xl:inline">Delete</span>
        </button>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Do you really want to delete this stock?
            </h2>
            <div className="flex justify-center gap-6 mt-5">
              <button
                className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-lg"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm"}
              </button>
              <button
                className="px-5 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 text-lg"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isRequestModalOpen && (
        <RequestStockModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          stock={stock}
        />
      )}
    </div>
  );
};

export default StockItem;