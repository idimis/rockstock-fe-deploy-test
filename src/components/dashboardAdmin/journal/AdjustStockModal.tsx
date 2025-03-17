// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axiosInstance from "@/utils/axiosInstance";
// import { toast } from "react-toastify";
// import { Stock } from "@/types/stock";

// interface StockModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   stock?: Stock | null;
//   warehouseId: number | null;
//   onRefresh: () => void;
// }

// const AdjustStockModal: React.FC<StockModalProps> = ({ isOpen, onClose, stock, warehouseId, onRefresh }) => {
//   if (!isOpen) return null;

//   const validationSchema = Yup.object().shape({
//     newStockQuantity: Yup.number()
//       .required("New stock quantity is required")
//       .notOneOf([0], "Quantity cannot be 0")
//       .min(1, "Quantity cannot be negative"),
//     description: Yup.string()
//       .min(3, "Description must be at least 3 characters")
//       .max(100, "Description cannot exceed 100 characters")
//       .required("Description is required"),
//   });

//   const mutation = useMutation({
//     mutationFn: async (values: { newStockQuantity: number; description: string }) => {
      
//       if (!stock || !warehouseId) {
//         throw new Error("Missing stock or warehouse data");
//       }
  
//       return axiosInstance.post(`/mutations/${warehouseId}/${stock.productId}/adjust`, {
//         newStockQuantity: values.newStockQuantity,
//         description: values.description,
//       });
//     },
//     onSuccess: () => {
//       toast.success("Stock adjusted successfully!");
//       onClose();
//       onRefresh();
//     },
//     onError: () => {
//       toast.error("Failed to adjust stock");
//     },
//   });

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Adjust Stock</h2>

//         <Formik
//           initialValues={{
//             newStockQuantity: stock?.stockQuantity ?? 0,
//             description: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { setSubmitting }) => {
//             mutation.mutate(values);
//             setSubmitting(false);
//           }}
//           enableReinitialize
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div>
//                 <label className="block text-gray-600 mb-2">Product</label>
//                 <div className="bg-gray-100 p-2 rounded">{stock?.productName || "Select a product"}</div>
//               </div>

//               <div className="mt-4">
//                 <label className="block text-gray-600 mb-2">Warehouse</label>
//                 <div className="bg-gray-100 p-2 rounded">{stock?.warehouseName || "Select a warehouse"}</div>
//               </div>

//               <div className="mt-4">
//                 <label className="block text-gray-600 mb-2">New Stock Quantity</label>
//                 <Field type="number" name="newStockQuantity" className="border p-2 w-full rounded" />
//                 <ErrorMessage name="newStockQuantity" component="div" className="text-red-500 text-sm" />
//               </div>

//               <div className="mt-4">
//                 <label className="block text-gray-600 mb-2">Description</label>
//                 <Field as="textarea" name="description" className="border p-2 w-full h-24 resize-none rounded" />
//                 <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
//               </div>

//               <div className="mt-4 flex justify-end space-x-3">
//                 <button
//                   type="submit"
//                   className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? "cursor-not-allowed opacity-75" : ""}`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Adjusting..." : "Adjust"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AdjustStockModal;