import { useState, useCallback } from "react";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

interface CreateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface SelectOption {
  value: number;
  label: string;
}

const CreateStockModal: React.FC<CreateStockModalProps> = ({ isOpen, onClose, onRefresh }) => {
  if (!isOpen) return null;

  const [selectedProduct, setSelectedProduct] = useState<SelectOption | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<SelectOption | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => setSearchTerm(searchValue), 750),
    []
  );

  const { data: products, isLoading: isLoadingProducts, error: productError } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: async (): Promise<SelectOption[]> => {
      const response = await axiosInstance.get("/products/active", {
        params: { name: searchTerm },
      });
      return response.data.content.map((product: any) => ({
        value: product.productId,
        label: product.productName,
      }));
    },
    enabled: !!searchTerm,
  });

  const { data: warehouses, isLoading: isLoadingWarehouses, error: warehouseError } = useQuery({
    queryKey: ["warehouses"],
    queryFn: async (): Promise<SelectOption[]> => {
      const response = await axiosInstance.get("/warehouses");
      return response.data.map((warehouse: any) => ({
        value: warehouse.id,
        label: warehouse.name,
      }));
    },
  });

  const { mutate, isPending: isCreatingStock } = useMutation({
    mutationFn: async () => {
      if (!selectedProduct || !selectedWarehouse) {
        throw new Error("Please select both a product and a warehouse");
      }

      const requestData = {
        productId: selectedProduct.value,
        warehouseId: selectedWarehouse.value,
      };

      console.log("Sending request to /stocks/create with data:", requestData);

      return axiosInstance.post(`/stocks/create`, requestData);
    },
    onSuccess: () => {
      toast.success("Stock created successfully!");
      onClose();
      onRefresh();
    },
    onError: (error: any) => {
      console.error("Stock creation failed:", error);

      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message || "Failed to create stock");
      } else {
        toast.error("Failed to create stock");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Stock</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Product</label>
          <Select
            options={products || []}
            value={selectedProduct}
            onChange={setSelectedProduct}
            placeholder={
              isLoadingProducts ? "Loading products..." : "Select a product..."
            }
            isLoading={isLoadingProducts}
            isSearchable
            isDisabled={isLoadingProducts || !!productError}
            onInputChange={(value) => debouncedSearch(value)}
          />
          {isLoadingProducts && !searchTerm && (
            <p className="text-gray-500 text-sm mt-1">Start typing to search...</p>
          )}
          {productError && <p className="text-red-500 text-sm mt-1">Failed to load products</p>}
          {products && products.length === 0 && !isLoadingProducts && (
            <p className="text-gray-500 text-sm mt-1">No products found</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Warehouse</label>
          <Select
            options={warehouses || []}
            value={selectedWarehouse}
            onChange={setSelectedWarehouse}
            placeholder={
              isLoadingWarehouses ? "Loading warehouses..." : "Select a warehouse..."
            }
            isLoading={isLoadingWarehouses}
            isSearchable
            isDisabled={isLoadingWarehouses || !!warehouseError}
          />
          {warehouseError && <p className="text-red-500 text-sm mt-1">Failed to load warehouses</p>}
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={() => mutate()}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isCreatingStock ? "opacity-75 cursor-not-allowed" : ""}`}
            disabled={isCreatingStock}
          >
            {isCreatingStock ? "Creating..." : "Create"}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStockModal;