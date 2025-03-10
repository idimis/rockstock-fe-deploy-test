import { ButtonProps } from "@/types/draft";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const ButtonDraft: React.FC<ButtonProps> = ({ formik, productId, isSubmitting }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleCancel = () => {
    setShowCancelModal(true);
  };
  const router = useRouter();

  const handleSaveDraft = async () => {
    try {
      const draftValues = { ...formik.values, categoryId: formik.values.productCategory };
      const { productCategory, ...finalValues } = draftValues;
      await axiosInstance.patch(`/products/${productId}/draft`, finalValues);
        router.push("/dashboard/admin/products");
      localStorage.setItem('toastMessage', 'Draft saved successfully!');
    } catch (error) {
      localStorage.setItem('toastMessage', 'Failed to save draft');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(`/products/${productId}/delete`);
      router.push("/dashboard/admin/products");
      localStorage.setItem('toastMessage', 'Draft deleted successfully!');
    } catch (error) {
      localStorage.setItem('toastMessage', 'Failed to delete the draft');
    }
  };

  return (
    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-lg text-white px-6 py-3 rounded-lg w-full md:w-auto font-medium shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Product"}
      </button>

      <button
        type="button"
        onClick={handleCancel}
        className="bg-red-500 hover:bg-red-600 transition text-lg text-white px-6 py-3 rounded-lg w-full md:w-auto font-medium shadow-md"
      >
        Cancel
      </button>

      {showCancelModal && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowCancelModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm md:w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center">
              Do you want to save your draft?
            </h3>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-gray-500 text-white text-lg px-4 py-2 rounded hover:bg-gray-600 w-full transition"
            >
              Save Draft
            </button>

            <button
              onClick={handleDeleteProduct}
              className="bg-red-500 text-white text-lg px-4 py-2 rounded hover:bg-red-600 w-full mt-3 transition"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonDraft;