import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError, AxiosResponse } from "axios";
import { Category, ApiErrorResponse, CategoryFormData } from "@/types/product";
import Image from 'next/image';

const CategoryModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  category?: Category | null;
}> = ({ isOpen, onClose, category }) => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const categorySchema = Yup.object().shape({
    categoryName: Yup.string()
      .required("Category name is required")
      .min(3, "Must be at least 3 characters"),
    file: Yup.mixed()
      .nullable()
      .test("fileType", "Only jpg, jpeg, png, gif allowed", (value) => {
        return value instanceof File ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : true;
      })
      .test("fileSize", "Max file size is 1MB", (value) => {
        return value instanceof File ? value.size <= 1024 * 1024 : true;
      }),
  });

  useEffect(() => {
    if (category) {
      setImagePreview(category.categoryPicture || null);
    }
  }, [category]);

  const handleSubmit = async (values: CategoryFormData): Promise<AxiosResponse<Category>> => {
    const formData = new FormData();
    formData.append("categoryName", values.categoryName);
    if (values.file) {
      formData.append("file", values.file);
    }

    if (category) {
      return axiosInstance.patch(`/categories/${category.categoryId}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      return axiosInstance.post("/categories/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  const mutation = useMutation<
    AxiosResponse<Category>,
    AxiosError<ApiErrorResponse>, 
    CategoryFormData
  >({
    mutationFn: handleSubmit,
    onSuccess: () => {
      toast.success(category ? "Category updated successfully!" : "Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
    onError: (error) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message || "Something went wrong";
        
      setServerError(errorMessage);
    },
  });

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full h-full">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {category ? "Edit Category" : "Create Category"}
          </h2>
          <Formik<CategoryFormData>
            initialValues={{ 
              categoryName: category?.categoryName || "", 
              file: null 
            }}
            validationSchema={categorySchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setServerError(null);
              mutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                  setImagePreview(null);
                  setSubmitting(false);
                },
                onError: () => {
                  setSubmitting(false);
                },
              });
            }}
          >
            {({ setFieldValue, isSubmitting, resetForm }) => (
              <Form>
                <div>
                  <label className="block mb-2">Category Name</label>
                  <Field name="categoryName" className="border p-2 w-full" />
                  <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mt-4">
                  <label className="block mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue("file", file);
                      setImagePreview(file ? URL.createObjectURL(file) : category?.categoryPicture || null);
                      toast.success("Picture uploaded succesfully");
                    }}
                    className="border p-2 w-full"
                  />
                  <ErrorMessage name="file" component="div" className="text-red-500 text-sm" />
                  {imagePreview && (
                    <div className="mt-2 w-full h-32 overflow-hidden">
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      layout="cover" 
                      width={300}
                      height={300}
                      className="object-cover rounded-lg w-full h-full"
                      />
                  </div>
                )}
                </div>

                {serverError && <div className="text-red-500 text-sm mt-2">{serverError}</div>}

                <div className="mt-4 flex justify-between">
                  <button 
                    type="submit" 
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? "cursor-not-allowed" : ""}`} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (category ? "Updating..." : "Creating...") : (category ? "Update" : "Create")}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { 
                      onClose();
                      setImagePreview(category?.categoryPicture || null);
                      resetForm();
                      setServerError(null);
                    }} 
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default CategoryModal;