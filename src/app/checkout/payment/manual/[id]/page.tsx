"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import SimpleNavbar from "@/components/common/SimpleNavbar";
import Footer from "@/components/common/Footer";
import { AiOutlineCloudUpload, AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { updateOrderStatus } from "@/services/orderService";

const ManualPayment = () => {
  const { id } = useParams();
  const orderId = Number(id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only .jpg, .jpeg, and .png files are allowed.");
        setSelectedFile(null);
        return;
      }

      if (file.size > 1 * 1024 * 1024) {
        setError("File size must be under 1MB.");
        setSelectedFile(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("paymentProof", selectedFile);

    try {
      await updateOrderStatus("PAYMENT_VERIFICATION", formData, orderId);
      setIsSuccess(true);
      setShowPopup("Your payment proof has been uploaded successfully! Your order is now waiting for verification.");
    } catch {
      setIsSuccess(false);
      setShowPopup("Failed to upload payment proof. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await updateOrderStatus("CANCELED", {}, orderId);
      setShowPopup("Your order has been canceled.");
    } catch {
      setShowPopup("Failed to cancel the order. Please try again.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(null);
    if (isSuccess) {
      router.push("/checkout/success");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SimpleNavbar />
      <div className="flex items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Manual Bank Transfer
          </h2>

          <p className="text-gray-700 mb-4">Follow these steps to complete your payment:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>Transfer the payment to the bank details below.</li>
            <li>Select and upload the payment proof.</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">Bank Transfer Details</h3>
          <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
            <p><strong>BNI</strong>: 1234 5678 9012 (a.n. Rockstock)</p>
            <p><strong>BCA</strong>: 9876 5432 1098 (a.n. Rockstock)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 text-sm mb-2">
              <strong>Note:</strong> Your order will be <strong>automatically canceled</strong> if you don&apos;t upload the payment proof within <strong>1 hour</strong>.
            </p>
            <p className="text-gray-700 text-sm mb-2">
              <strong>Accepted file types:</strong> .jpg, .jpeg, .png (Max: 1MB)
            </p>

            <label className="flex items-center justify-center border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition">
              <AiOutlineCloudUpload className="text-gray-600 text-3xl mr-2" />
              <span className="text-gray-800 font-medium">Click to Upload</span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {selectedFile && (
              <div className="mt-3">
                <p className="text-sm text-gray-700">Preview:</p>
                <Image 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="Preview" 
                  width={300} 
                  height={200} 
                  className="mt-2 w-full rounded-lg"
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className={`mt-4 flex items-center justify-center px-6 py-2 w-full text-lg font-semibold rounded-lg ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Payment Proof"}
          </button>

          <button
            onClick={handleCancel}
            className="mt-3 flex items-center justify-center px-6 py-2 w-full text-lg font-semibold rounded-lg bg-gray-600 text-white hover:bg-gray-500"
          >
            Cancel Order
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <AiOutlineWarning className="text-3xl text-yellow-500 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-900">{showPopup}</p>
              <button
                onClick={handleClosePopup}
                className="mt-4 flex items-center justify-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                <AiOutlineCheckCircle className="mr-2" /> OK
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ManualPayment;