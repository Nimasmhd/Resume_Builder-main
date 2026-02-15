import React from "react";

const Modal = ({ isOpen, onClose, children, hideHeader = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} // click outside closes modal
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl z-10 animate-scaleIn">
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-gray-800">Modal</h2>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
          </div>
        )}

        {/* CLOSE BUTTON (for hideHeader case) */}
        {hideHeader && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 shadow"
          >
            ✕
          </button>
        )}

        {/* Body */}
        <div>{children}</div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
