"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError, AxiosResponse } from "axios";
import { Stock, ApiErrorResponse, StockFormData } from "@/types/stock";

const StockModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  stock?: Stock | null;
}> = ({ isOpen, onClose, stock }) => {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const stockSchema = Yup.object().shape({
    productId: Yup.number().required("Product is required"),
    warehouseId: Yup.number().required("Warehouse is required"),
  });

  const handleSubmit = async (values: StockFormData): Promise<AxiosResponse<Stock>> => {
    if (stock) {
      throw new Error("Stock cannot be edited.");
    }
    return axiosInstance.post("/stocks/create", values);
  };

  const mutation = useMutation<
    AxiosResponse<Stock>,
    AxiosError<ApiErrorResponse>, 
    StockFormData
  >({
    mutationFn: handleSubmit,
    onSuccess: () => {
      toast.success("Stock created successfully!");
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Create Warehouse Stock</h2>
          <Formik<StockFormData>
            initialValues={{ 
              productId: stock?.productId || 0, 
              warehouseId: stock?.warehouseId || 0
            }}
            validationSchema={stockSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setServerError(null);
              mutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                  setSubmitting(false);
                },
                onError: () => {
                  setSubmitting(false);
                },
              });
            }}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <div>
                  <label className="block mb-2">Product</label>
                  <Field as="select" name="productId" className="border p-2 w-full">
                    <option value="">Select Product</option>
                    {/* Replace with dynamic product list */}
                    <option value="1">Product A</option>
                    <option value="2">Product B</option>
                  </Field>
                  <ErrorMessage name="productId" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mt-4">
                  <label className="block mb-2">Warehouse</label>
                  <Field as="select" name="warehouseId" className="border p-2 w-full">
                    <option value="">Select Warehouse</option>
                    {/* Replace with dynamic warehouse list */}
                    <option value="1">Warehouse A</option>
                    <option value="2">Warehouse B</option>
                  </Field>
                  <ErrorMessage name="warehouseId" component="div" className="text-red-500 text-sm" />
                </div>

                {serverError && <div className="text-red-500 text-sm mt-2">{serverError}</div>}

                <div className="mt-4 flex justify-between">
                  <button 
                    type="submit" 
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? "cursor-not-allowed" : ""}`} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { 
                      onClose();
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

export default StockModal;
