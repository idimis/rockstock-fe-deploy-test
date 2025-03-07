import { ReactNode } from "react";

interface DialogProps {
  onClose: () => void;
  children: ReactNode;
}

const Dialog = ({ onClose, children }: DialogProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        {children}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Dialog;
