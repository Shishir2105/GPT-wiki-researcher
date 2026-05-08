import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div className="bg-white w-[85%] max-h-[85vh] overflow-y-auto rounded-xl shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <button
        onClick={onClose}
        className="text-slate-500 hover:text-red-500 text-xl"
      >
        ✕
      </button>
    </div>

    {children}
  </div>
</div>

  );
}

/* Simple inline styles (no CSS lib needed) */

// const overlayStyle: React.CSSProperties = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "rgba(0,0,0,0.4)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000
// };

// const modalStyle: React.CSSProperties = {
//   backgroundColor: "#fff",
//   padding: 20,
//   width: "80%",
//   maxHeight: "80vh",
//   overflowY: "auto",
//   borderRadius: 8
// };

// const headerStyle: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: 10
// };

// const bodyStyle: React.CSSProperties = {
//   marginTop: 10
// };
