// frontend/pages/customers/add.js
// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE: POST /customers with toastHelper notifications.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";
import { toastHelper } from "@/components/Toast";

export default function AddCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`${API}/customers`, form);

      // ✅ Toast on POST success
      toastHelper.success("Customer added successfully!");
      router.push("/customers");
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
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add Customer"}
        </button>
      </form>
    </div>
  );
}
