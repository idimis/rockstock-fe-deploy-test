import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { MutationJournal, MutationStatus } from "@/types/mutationJournal";
import { formatUpdatedAt } from "@/utils/FormatNumber";
import ApprovalModal from "@/components/dashboardAdmin/journal/ApprovalModal";
import FinalizeModal from "@/components/dashboardAdmin/journal/FinalizeModal";
import CancelModal from "@/components/dashboardAdmin/journal/CancelModal";

interface MutationJournalItemProps {
  journal: MutationJournal;
  warehouseId?: number | null;
}

const MutationJournalItem: React.FC<MutationJournalItemProps> = ({ journal, warehouseId }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const formattedUpdatedAt = formatUpdatedAt(journal.updatedAt);
  const targetWarehouse = warehouseId;

  const cancelMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch(
        `/mutations/${journal.journalId}/${targetWarehouse}/cancel`,
        { description: "Cancelled by admin" }
      );
    },
    onSuccess: () => {
      toast.success("Mutation request cancelled successfully!");
      setTimeout(() => window.location.reload(), 500);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to cancel mutation request";
      toast.error(errorMessage);
    },
  });

  const processMutation = useMutation({
    mutationFn: async (payload: { approved: boolean; description: string }) => {
      return axiosInstance.patch(
        `/mutations/${journal.journalId}/${targetWarehouse}/process`,
        payload
      );
    },
    onSuccess: () => {
      toast.success("Mutation request processed successfully!");
      setTimeout(() => window.location.reload(), 500);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to process mutation request";
      toast.error(errorMessage);
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (payload: { completed: boolean; description: string }) => {
      return axiosInstance.patch(
        `/mutations/${journal.journalId}/${targetWarehouse}/confirm`,
        payload
      );
    },
    onSuccess: () => {
      toast.success("Mutation request completed successfully!");
      setTimeout(() => window.location.reload(), 500);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to complete mutation request";
      toast.error(errorMessage);
    },
  });

  const statusColors: Record<MutationStatus, string> = {
    [MutationStatus.CANCELLED]: "text-red-600 bg-red-100 px-3 py-1 rounded-md",
    [MutationStatus.FAILED]: "text-red-600 bg-red-100 px-3 py-1 rounded-md",
    [MutationStatus.PENDING]: "text-yellow-600 bg-yellow-100 px-3 py-1 rounded-md",
    [MutationStatus.APPROVED]: "text-yellow-600 bg-yellow-100 px-3 py-1 rounded-md",
    [MutationStatus.COMPLETED]: "text-green-600 bg-green-200 px-3 py-1 rounded-md",
    [MutationStatus.ON_DELIVERY]: "text-green-600 bg-green-200 px-3 py-1 rounded-md",
  };

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 lg:p-6 w-full min-h-[100px] flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-1">
          <p className="text-xs text-gray-500">Journal ID: {journal.journalId}</p>
          <p className="text-xs text-gray-500">Warehouse Stock ID: {journal.warehouseStockId}</p>
          <p className="text-lg lg:text-2xl font-bold text-gray-800">{journal.productName}</p>
          <p className="text-sm text-gray-700">Description: {journal.description}</p>
        </div>

        <div className="flex flex-col text-center">
          {journal.originWarehouse !== "N/A" && (
            <p className="text-sm lg:text-lg font-semibold text-gray-700">
              {journal.originWarehouse} ➝
            </p>
          )}
          <p className="text-sm lg:text-lg font-semibold text-gray-700">
            {journal.destinationWarehouse}
          </p>
          {journal.previousStockQuantity !== null && journal.newStockQuantity !== null && (
            <p className="text-xs lg:text-sm text-gray-500">
              <span className="font-semibold">Stock From:</span>{" "}
              {journal.previousStockQuantity} pcs ➝ {journal.newStockQuantity} pcs
            </p>
          )}
          <p className="text-sm lg:text-sm text-gray-600">
            <span className="font-semibold">Mutation:</span> {journal.mutationQuantity} pcs
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-2">
          <p className={`text-lg lg:text-2xl font-semibold ${statusColors[journal.mutationStatus]}`}>
            {journal.mutationStatus}
          </p>
          <p className="text-xs lg:text-md text-gray-600">{formattedUpdatedAt}</p>
          <div className="flex space-x-2 lg:space-x-4">
            {journal.mutationStatus === MutationStatus.PENDING && (
              <>
                {targetWarehouse === journal.originWarehouseId && (
                  <button
                    className="px-3 py-1 text-sm lg:text-lg text-green-600 hover:text-green-800 transition"
                    onClick={() => setIsApproveModalOpen(true)}
                  >
                    Approve
                  </button>
                )}
                {targetWarehouse === journal.destinationWarehouseId && (
                  <button
                    className="px-3 py-1 text-sm lg:text-lg text-red-600 hover:text-red-800 transition"
                    onClick={() => setIsCancelModalOpen(true)}
                  >
                    Cancel
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CancelModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} onConfirm={() => cancelMutation.mutate()} isLoading={cancelMutation.isPending} />
      {isApproveModalOpen && <ApprovalModal onSubmit={(approved, description) => processMutation.mutate({ approved, description })} onClose={() => setIsApproveModalOpen(false)} mutationStatus={"error"} />}
      {isFinalizeModalOpen && <FinalizeModal onSubmit={(completed, description) => completeMutation.mutate({ completed, description })} onClose={() => setIsFinalizeModalOpen(false)} mutationStatus={"error"} />}
    </div>
  );
};

export default MutationJournalItem;