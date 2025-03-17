import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { ApiErrorResponse, Stock } from "@/types/stock";
import Select from "react-select";
import { Warehouse } from "@/types/warehouse";

interface RequestStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
}

const RequestStockModal: React.FC<RequestStockModalProps> = ({ isOpen, onClose, stock }) => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [originWarehouseId, setOriginWarehouseId] = useState<number | null>(null);

  useEffect(() => {
    axiosInstance.get("/warehouses").then((response) => {
      setWarehouses(response.data);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    mutationQuantity: Yup.number()
      .required("Mutation quantity is required")
      .min(1, "Quantity must be at least 1"),
    description: Yup.string()
      .min(3, "Description must be at least 3 characters")
      .max(100, "Description cannot exceed 100 characters")
      .required("Description is required"),
    originWarehouse: Yup.number().required("Origin warehouse is required").test(
      'not-same-as-destination',
      'Origin warehouse cannot be the same as destination warehouse',
      function(value) {
        return value !== stock.warehouseId;
      }
    ),
  });

  const mutation = useMutation({
    mutationFn: async (values: { mutationQuantity: number; description: string }) => {
      if (!stock || !originWarehouseId) {
        throw new Error("Missing stock or warehouse data");
      }
      
      try {
        return await axiosInstance.post(`/mutations/${stock.warehouseId}/${stock.productId}/request`, {
          originWarehouseId,
          mutationQuantity: values.mutationQuantity,
          description: values.description,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ApiErrorResponse>;
          if (axiosError.response) {
            throw new Error(axiosError.response.data.message || "Failed to request stock");
          }
        }
        throw new Error("Failed to request stock");
      }
    },
    onSuccess: () => {
      toast.success("Stock request submitted successfully!");
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to request stock");
    },
  });

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Request Stock</h2>

        <Formik
          initialValues={{
            mutationQuantity: 0,
            description: "",
            originWarehouse: originWarehouseId || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values, {
              onSuccess: () => {
                setSubmitting(false);
              },
              onError: () => {
                setSubmitting(false);
              },
            });
          }}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              <div className="mt-4">
                <label className="block text-gray-600 mb-2">Product</label>
                <div className="bg-gray-100 p-2 rounded">{stock.productName}</div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-600 mb-2">Destination Warehouse</label>
                <div className="bg-gray-100 p-2 rounded">{stock.warehouseName}</div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-600 mb-2">Origin Warehouse</label>
                <Field name="originWarehouse">
                  {({ field, form }: FieldProps) => (
                    <Select
                      {...field}
                      options={warehouses
                        .filter((warehouse) => warehouse.id !== stock.warehouseId)
                        .map((warehouse) => ({
                          value: warehouse.id,
                          label: warehouse.name,
                        }))}
                      onChange={(selectedOption) => {
                        setFieldValue("originWarehouse", selectedOption?.value || "");
                        setOriginWarehouseId(selectedOption?.value || null);
                      }}
                      value={warehouses.find((warehouse) => warehouse.id === originWarehouseId)
                        ? {
                            value: originWarehouseId,
                            label: warehouses.find((warehouse) => warehouse.id === originWarehouseId)?.name,
                          }
                        : null}
                      placeholder="Select origin warehouse"
                    />
                  )}
                </Field>
                {touched.originWarehouse && errors.originWarehouse && (
                  <div className="text-red-500 text-sm">{errors.originWarehouse}</div>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-600 mb-2">Request Quantity Needed</label>
                <Field
                  type="number"
                  name="mutationQuantity"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage name="mutationQuantity" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mt-4">
                <label className="block text-gray-600 mb-2">Description</label>
                <Field as="textarea" name="description" className="border p-2 w-full h-24 resize-none rounded" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? "cursor-not-allowed opacity-75" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Stock"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
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
  ) : null;
};

export default RequestStockModal;