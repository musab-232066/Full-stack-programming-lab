// frontend/components/Toast.js
import { Toaster, toast } from "react-hot-toast";

// ─── Configured Toaster ───────────────────────────────────────────────────────
// Drop <Toaster /> from this file into _app.js (inside AuthProvider).
export function ToasterConfig() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0f172a",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)",
        },
        success: {
          iconTheme: { primary: "#22c55e", secondary: "#0f172a" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#0f172a" },
        },
      }}
    />
  );
}

// ─── toastHelper ─────────────────────────────────────────────────────────────
// Usage:
//   import { toastHelper } from "@/components/Toast";
//   toastHelper.success("Customer added successfully!");
//   toastHelper.error("Something went wrong.");
//   toastHelper.info("Loading data...");
export const toastHelper = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast(msg),
};

export default ToasterConfig;
