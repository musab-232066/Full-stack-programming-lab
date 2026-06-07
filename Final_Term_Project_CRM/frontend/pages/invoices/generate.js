// frontend/pages/invoices/generate.js
// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE: POST /invoices with toastHelper notifications.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";
import { toastHelper } from "@/components/Toast";


export default function GenerateInvoicePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    customerId: "",
    amount: "",
    description: "",
    dueDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`${API}/invoices`, form);

      // ✅ Toast on POST /invoices success
      toastHelper.success("Invoice generated!");
      router.push("/invoices");
    } catch (error) {
      // ✅ Toast on error
      toastHelper.error(
        error.response?.data?.message || "Operation failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "480px" }}>
      <h1>Generate Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Customer ID</label>
          <input
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Due Date</label>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Generating..." : "Generate Invoice"}
        </button>
      </form>
    </div>
  );
}
