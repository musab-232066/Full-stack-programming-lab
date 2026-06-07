// frontend/pages/customers/index.js
// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE: How to wire toastHelper into customer mutation calls.
// Replace the placeholder API calls with your actual api/fetch logic.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { toastHelper } from "@/components/Toast";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch all customers ──────────────────────────────────────────────────
  const fetchCustomers = async () => {
    try {
      const { data } = await api.get("/customers");

      setCustomers(data.customers);
    } catch (error) {
      toastHelper.error(
        error.response?.data?.message || "Failed to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ── DELETE a customer ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await api.delete(`/customers/${id}`);

      // ✅ Toast on success
      toastHelper.success("Customer deleted!");
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      // ✅ Toast on error
      toastHelper.error(
        error.response?.data?.message || "Operation failed"
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1>Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c._id} style={{ marginBottom: "8px" }}>
              {c.name} — {c.email}
              <button
                onClick={() => handleDelete(c._id)}
                style={{ marginLeft: "12px", color: "red", cursor: "pointer" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
