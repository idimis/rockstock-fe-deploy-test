import React from "react";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const CancelModal: React.FC<CancelModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Do you really want to cancel this mutation request?
        </h2>
        <div className="flex justify-center gap-6 mt-5">
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xl"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Confirm"}
          </button>
          <button
            className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 text-xl"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;