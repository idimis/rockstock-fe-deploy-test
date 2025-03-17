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
    <div className="flex flex-col md:flex-row items-center md:justify-between bg-gray-100 p-6 rounded-lg shadow-sm w-full min-w-0">
    {/* Left Section: Image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={category.categoryPicture}
          alt={category.categoryName}
          width={400}
          height={400}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>

      {/* Middle Section: Name (Centered in mobile, left-aligned in PC) */}
      <p className="mt-4 md:mt-0 md:ml-4 text-lg md:text-2xl font-medium text-gray-800 text-center md:text-left flex-1">
        {category.categoryName}
      </p>

      {/* Right Section: Buttons (Centered in mobile, right-aligned in PC) */}
      <div className="flex flex-wrap md:ml-auto space-x-2 md:space-x-8 mt-4 md:mt-0 justify-center md:justify-end">
        <button className="flex items-center gap-2 md:gap-3 text-lg md:text-xl text-blue-600 hover:text-blue-800 transition" onClick={() => onEdit(category)}>
          <MdEdit className="text-xl md:text-2xl" />
          <span className="hidden lg:inline">Edit</span>
        </button>
        <button 
          className="flex items-center gap-2 md:gap-3 text-lg md:text-xl text-red-600 hover:text-red-800 transition"
          onClick={() => setIsConfirmOpen(true)}
        >
          <MdDelete className="text-xl md:text-2xl" />
          <span className="hidden lg:inline">Delete</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Do you really want
            </h2>
            <h2 className="text-xl font-semibold text-gray-900">
              to delete this category?
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
    </div>
  );
};

export default CategoryItem;