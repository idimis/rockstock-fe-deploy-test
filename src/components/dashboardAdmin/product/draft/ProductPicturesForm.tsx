import { FC } from "react";
import { FiTrash, FiUploadCloud } from "react-icons/fi";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { ProductPicturesProps } from "@/types/draft"

const ProductPicturesForm: FC<ProductPicturesProps> = ({
  productId,
  localProductPictures,
  setLocalProductPictures,
  isSubmitting,
  setSubmitting,
  updateFormik,
  formik,
}) => {
  const handleUploadPicture = async (position: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg, image/gif";
    input.click();

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const validExtensions = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      const maxSize = 1 * 1024 * 1024;
  
      if (!validExtensions.includes(file.type)) {
        toast.error("Only PNG, JPG, JPEG, and GIF files are allowed.");
        return;
      }
  
      if (file.size > maxSize) {
        toast.error("File size must not exceed 1MB.");
        return;
      }

      try {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("file", file);

        await axiosInstance.post(`/pictures/${productId}/${position}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const newPictures = [...localProductPictures];
        newPictures[position - 1] = URL.createObjectURL(file);
        setLocalProductPictures(newPictures);
        updateFormik(newPictures);

        toast.success("Picture uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload picture");
      } finally {
        setSubmitting(false);
      }
    };
  };

  const handleDeletePicture = async (position: number) => {
    try {
      setSubmitting(true);
      await axiosInstance.delete(`/pictures/${productId}/${position}/delete`);

      const newPictures = [...localProductPictures];
      newPictures[position - 1] = null;
      setLocalProductPictures(newPictures);
      updateFormik(newPictures);

      toast.success("Picture deleted successfully!");
    } catch (error) {
      toast.error("Error deleting picture");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-semibold">Product Pictures</label>
      <div className="flex flex-col md:flex-row gap-4">
        {localProductPictures.map((pic, position) => (
          <div key={position} className="relative w-56 h-40 border rounded flex items-center justify-center bg-gray-100">
            {pic ? (
              <>
                <img
                  src={pic}
                  alt={`Product ${position + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  className={`absolute top-1 right-1 p-1 text-white rounded-full transition ${
                    isSubmitting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={() => handleDeletePicture(position + 1)}
                  disabled={isSubmitting}
                >
                  <FiTrash className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                className={`absolute top-1 right-1 p-1 text-gray-700 rounded-full transition ${
                  isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => handleUploadPicture(position + 1)}
                disabled={isSubmitting}
              >
                <FiUploadCloud className="w-6 h-6" />
              </button>
            )}
          </div>
        ))}
      </div>
      {formik.errors.productPictures && typeof formik.errors.productPictures === "string" && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.productPictures}</div>
      )}
    </div>
  );
};

export default ProductPicturesForm;