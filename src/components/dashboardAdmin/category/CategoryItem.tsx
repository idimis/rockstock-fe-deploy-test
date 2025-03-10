import { useState } from "react";
import Image from "next/image";
import { MdEdit, MdDelete } from "react-icons/md";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Category } from "@/types/product";
import { AxiosError } from "axios";

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onEdit }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch(`/categories/${category.categoryId}/delete`, {
        categoryId: category.categoryId,
      });
    },
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to delete category";
      toast.error(errorMessage);
    },
  });

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={category.categoryPicture}
            alt={category.categoryName}
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>
        <p className="ml-4 text-lg font-medium text-gray-700">{category.categoryName}</p>
      </div>
      <div className="flex space-x-6">
        <button 
          className="flex items-center gap-2 text-lg md:text-base text-blue-600 hover:text-blue-800 transition"
          onClick={() => onEdit(category)}
        >
          <MdEdit className="text-xl" />
          <span className="hidden md:inline">Edit</span>
        </button>
        <button 
          className="flex items-center gap-2 text-lg md:text-base text-red-600 hover:text-red-800 transition"
          onClick={() => setIsConfirmOpen(true)}
        >
          <MdDelete className="text-xl" />
          <span className="hidden md:inline">Delete</span>
        </button>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Do you really want to delete this category?
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

export default CategoryItem;