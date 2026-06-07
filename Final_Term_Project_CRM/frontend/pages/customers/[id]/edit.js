// frontend/pages/customers/[id]/edit.js
// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE: PUT /customers/:id with toastHelper notifications.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toastHelper } from "@/components/Toast";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function EditCustomerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing customer data
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API}/customers/${id}`)
      .then(({ data }) => setForm(data))
      .catch((error) =>
        toastHelper.error(
          error.response?.data?.message || "Failed to load customer"
        )
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`${API}/customers/${id}`, form);

      // ✅ Toast on PUT success
      toastHelper.success("Customer updated!");
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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "480px" }}>
      <h1>Edit Customer</h1>
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
          {submitting ? "Saving..." : "Update Customer"}
        </button>
      </form>
    </div>
  );
}
