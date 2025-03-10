import { ButtonProps } from "@/types/draft";
import { useRouter } from "next/navigation";
import React from "react";

export const EditButton: React.FC<ButtonProps> = ({ isSubmitting }) => {
  const router = useRouter();
  const backToProduct = () => {
    router.push("/dashboard/admin/products");
  };

  return (
    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-lg text-white px-6 py-3 rounded-lg w-full md:w-auto font-medium shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Editing..." : "Edit Product"}
      </button>

      <button
        type="button"
        onClick={backToProduct}
        className="bg-red-500 hover:bg-red-600 transition text-lg text-white px-6 py-3 rounded-lg w-full md:w-auto font-medium shadow-md"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditButton;