// import { useState } from "react";
// import { MdEdit, MdCancel } from "react-icons/md";
// import axiosInstance from "@/utils/axiosInstance";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// import { format } from "date-fns";
// import { MutationJournal, MutationStatus, StockAdjustmentType } from "@/types/mutationJournal";

// interface MutationJournalItemProps {
//   journal: MutationJournal;
//   onEdit: (journal: MutationJournal) => void;
// }

// const MutationJournalItem: React.FC<MutationJournalItemProps> = ({ journal, onEdit }) => {
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);

//   // Format date as "Monday, 11 Mar 24"
//   const formattedUpdatedAt = journal.updatedAt
//     ? format(new Date(journal.updatedAt), "EEEE, dd MMM yy")
//     : "N/A";

//   // Cancel Mutation API Call
//   const cancelMutation = useMutation({
//     mutationFn: async () => {
//       return axiosInstance.patch(`/mutations/${journal.journalId}/${journal.originWarehouse}/cancel`, {
//         description: "Cancelled by admin",
//       });
//     },
//     onSuccess: () => {
//       toast.success("Mutation request cancelled successfully!");
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
//     },
//     onError: (error: unknown) => {
//       const axiosError = error as AxiosError<{ message?: string }>;
//       const errorMessage = axiosError.response?.data?.message || "Failed to cancel mutation request";
//       toast.error(errorMessage);
//     },
//   });

//   const statusColors: Record<MutationStatus, string> = {
//     [MutationStatus.CANCELLED]: "text-red-600 bg-red-100 px-3 py-1 rounded-md",
//     [MutationStatus.FAILED]: "text-red-600 bg-red-100 px-3 py-1 rounded-md",
//     [MutationStatus.PENDING]: "text-yellow-600 bg-yellow-100 px-3 py-1 rounded-md",
//     [MutationStatus.APPROVED]: "text-yellow-600 bg-yellow-100 px-3 py-1 rounded-md",
//     [MutationStatus.COMPLETED]: "text-green-600 bg-green-200 px-3 py-1 rounded-md",
//     [MutationStatus.ON_DELIVERY]: "text-green-600 bg-green-200 px-3 py-1 rounded-md",
//   };

//   const formatText = (text: string) => {
//     return text
//       .toLowerCase()
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   return (
//     <div className="grid grid-cols-3 items-center bg-gray-100 p-8 rounded-lg shadow-sm w-full gap-6">
//       {/* Left Section: Product Info */}
//       <div className="flex flex-col space-y-2">
//         {/* Journal ID */}
//         <p className="text-lg font-medium text-gray-500">Mutation Journal ID: {journal.journalId}</p>

//         {/* Product Name */}
//         <p className="text-2xl font-bold text-gray-800">{journal.productName}</p>

//         {/* Stock ID */}
//         <p className="text-sm text-gray-500">Warehouse Stock ID: {journal.warehouseStockId}</p>

//         {/* Mutation Quantity */}
//         <p className="text-lg text-gray-600">
//           <span className="font-semibold">Mutation:</span> {journal.mutationQuantity} pcs
//         </p>

//         {/* Description */}
//         <p className="text-md text-gray-700">
//           <span className="font-semibold">Description:</span> {journal.description}
//         </p>
//       </div>

//       {/* Center Section: Warehouse Movement & Stock Change */}
//       <div className="text-center w-full">
//         {/* Warehouse Movement */}
//         {journal.originWarehouse !== "N/A" && <p className="text-lg font-semibold text-gray-700">{journal.originWarehouse} ➝</p>}
//         <p className="text-lg font-semibold text-gray-700">{journal.destinationWarehouse}</p>

//         {/* Stock Change Display */}
//         {journal.previousStockQuantity !== null && journal.newStockQuantity !== null && (
//           <p className="text-md text-gray-500">
//             <span className="font-semibold">Stock From:</span> {journal.previousStockQuantity} pcs ➝ {journal.newStockQuantity} pcs
//           </p>
//         )}

//         {/* Stock Change Type & Adjustment */}
//         <p className="text-md text-gray-700 font-semibold mt-1">
//           {formatText(String(journal.stockChangeType))}, {formatText(String(journal.stockAdjustmentType))}
//         </p>
//       </div>

//       {/* Right Section: Status & Date */}
//       <div className="flex flex-col items-end space-y-2">
//         {/* Mutation Status */}
//         <p className={`text-2xl font-semibold ${statusColors[journal.mutationStatus] || "text-blue-600"}`}>
//           {journal.mutationStatus}
//         </p>

//         {/* Updated Date */}
//         <p className="text-md text-gray-600">{formattedUpdatedAt}</p>

//         {/* Action Buttons */}
//         <div className="flex space-x-4">
//           {/* Edit Button */}
//           <button
//             className="flex items-center gap-2 text-xl text-blue-600 hover:text-blue-800 transition"
//             onClick={() => onEdit(journal)}
//           >
//             <MdEdit className="text-2xl" />
//             <span className="hidden xl:inline">Edit</span>
//           </button>

//           {/* Cancel Button (Only if status is PENDING) */}
//           {journal.mutationStatus === MutationStatus.PENDING && (
//             <button
//               className="flex items-center gap-2 text-xl text-red-600 hover:text-red-800 transition"
//               onClick={() => setIsConfirmOpen(true)}
//             >
//               <MdCancel className="text-2xl" />
//               <span className="hidden xl:inline">Cancel</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {isConfirmOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
//             <h2 className="text-2xl font-bold text-gray-900">
//               Do you really want to cancel this mutation request?
//             </h2>
//             <div className="flex justify-center gap-6 mt-5">
//               <button
//                 className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xl"
//                 onClick={() => cancelMutation.mutate()}
//                 disabled={cancelMutation.isPending}
//               >
//                 {cancelMutation.isPending ? "Cancelling..." : "Confirm"}
//               </button>
//               <button
//                 className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 text-xl"
//                 onClick={() => setIsConfirmOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MutationJournalItem;
