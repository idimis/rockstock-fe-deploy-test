// "use client";

// import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import Select from "react-select";
// import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
// import { Warehouse } from "@/types/warehouse";

// const MutationJournalFilter = ({
//   currentSortDirection,
//   currentWarehouse,
//   handleFilterChange,
// }: {
//   currentSortDirection: string;
//   currentWarehouse?: number | null;
//   handleFilterChange: (filters: { warehouse: number | null; sortDirection?: string }) => void;
// }) => {
//   const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchWarehouses = async () => {
//       try {
//         const response = await axiosInstance.get("/warehouses");
//         console.log("API Response:", response.data);

//         const warehouseList = response.data ?? [];
//         console.log("Setting Warehouses:", warehouseList);

//         setWarehouses(warehouseList);
//       } catch (error) {
//         console.error("Error fetching warehouses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWarehouses();
//   }, []);

//   const warehouseOptions = [
//     { value: null, label: "All Warehouses" },
//     ...warehouses.map((warehouse) => ({
//       value: warehouse.id,
//       label: warehouse.name,
//     })),
//   ];

//   console.log("Warehouse Options:", warehouseOptions);

//   return (
//     <div className="flex flex-col md:flex-row md:items-center md:space-x-2 gap-4 mt-6">
//       <div className="flex flex-col md:flex-row md:items-center md:space-x-2 w-full gap-4">
        
//         <div className="relative w-full md:w-64">
//           <Select
//             options={warehouseOptions}
//             className="text-gray-500"
//             placeholder={loading ? "Loading warehouses..." : "Select Warehouse"}
//             isLoading={loading}
//             isSearchable
//             value={warehouseOptions.find((w) => w.value === currentWarehouse) || warehouseOptions[0]}
//             onChange={(selectedOption) => {
//               handleFilterChange({
//                 warehouse: selectedOption?.value ?? null,
//               });
//             }}
//           />
//         </div>

//         <div className="flex space-x-2 md:ml-2 w-full md:w-auto justify-end">
//           <button
//             onClick={() =>
//               handleFilterChange({
//                 sortDirection: "asc",
//                 warehouse: currentWarehouse ?? null,
//               })
//             }
//             className={`p-1 rounded transition ${
//               currentSortDirection === "asc" ? "bg-gray-400 text-white" : "text-gray-600 hover:bg-gray-300"
//             }`}
//           >
//             <AiOutlineArrowUp className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() =>
//               handleFilterChange({
//                 sortDirection: "desc",
//                 warehouse: currentWarehouse ?? null,
//               })
//             }
//             className={`p-1 rounded transition ${
//               currentSortDirection === "desc" ? "bg-gray-400 text-white" : "text-gray-600 hover:bg-gray-300"
//             }`}
//           >
//             <AiOutlineArrowDown className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MutationJournalFilter;