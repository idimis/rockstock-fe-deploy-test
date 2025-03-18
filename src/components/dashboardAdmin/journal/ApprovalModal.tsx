"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdClose } from "react-icons/md";

interface ApprovalModalProps {
  onSubmit: (approved: boolean, description: string) => Promise<void> | void;
  onClose: () => void;
  mutationStatus: "idle" | "pending" | "success" | "error";
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ onSubmit, onClose, mutationStatus }) => {
  const validationSchema = Yup.object({
    description: Yup.string()
      .min(3, "Description must be at least 3 characters")
      .max(100, "Description must be at most 100 characters")
      .required("Description is required"),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Close Button (Disabled while pending) */}
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          onClick={() => {
            if (mutationStatus !== "pending") {
              console.log("Close button clicked");
              onClose();
            }
          }}
          disabled={mutationStatus === "pending"}
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Confirm to approve this request?
        </h2>

        <Formik
          initialValues={{ description: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmit(true, values.description);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Description Input */}
              <div className="mb-4">
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter description (3-100 characters)"
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={mutationStatus === "pending"}
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xl disabled:opacity-50"
                  disabled={isSubmitting || mutationStatus === "pending"}
                >
                  {mutationStatus === "pending" ? "Processing..." : "Approve"}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xl disabled:opacity-50"
                  onClick={() => onSubmit(false, "")}
                  disabled={mutationStatus === "pending"}
                >
                  {mutationStatus === "pending" ? "Processing..." : "Cancel"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApprovalModal;