// frontend/pages/customers/index.js

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar         from "../../components/Navbar";
import CustomerCard   from "../../components/CustomerCard";
import CustomerForm   from "../../components/CustomerForm";
import api            from "../../utils/api";

import {
  RiSearchLine,
  RiCloseLine,
  RiUserAddLine,
  RiDeleteBinLine,
  RiAlertLine,
  RiRefreshLine,
} from "react-icons/ri";

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_FILTERS = ["All", "Lead", "Active", "Inactive"];

// ─── Pure helper ─────────────────────────────────────────────────────────────

function applyFilters(list, search, status) {
  let result = list;
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter((c) => c.name.toLowerCase().includes(q));
  }
  if (status !== "All") {
    result = result.filter((c) => c.status === status);
  }
  return result;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Spinner({ label = "Loading..." }) {
  return (
    <div className="state-center">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <RiAlertLine className="error-icon" />
      <span>{message}</span>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          <RiRefreshLine /> Retry
        </button>
      )}
    </div>
  );
}

function Modal({ onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

function CustomersContent() {

  // Data
  const [customers,  setCustomers]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Filters
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filtered,     setFiltered]     = useState([]);
  const debounceRef = useRef(null);

  // Edit modal
  const [editTarget, setEditTarget] = useState(null);
  const [editError,  setEditError]  = useState("");
  const [editSaving, setEditSaving] = useState(false);

  // Delete confirm
  const [deleteId,    setDeleteId]    = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleting,    setDeleting]    = useState(false);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  // Backend: GET /customers → { success, count, customers: [...] }
  const fetchCustomers = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await api.get("/customers");
      if (res.data.success) {
        setCustomers(res.data.customers);
      } else {
        setFetchError("The server returned an unexpected response.");
      }
    } catch (err) {
      setFetchError(
        err.response?.data?.message ?? "Could not load customers. Check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  // ── Debounced filter (300 ms) ─────────────────────────────────────────────
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => setFiltered(applyFilters(customers, search, statusFilter)),
      300
    );
    return () => clearTimeout(debounceRef.current);
  }, [customers, search, statusFilter]);

  // ── Edit ──────────────────────────────────────────────────────────────────
  const openEdit  = (customer) => { setEditTarget(customer); setEditError(""); };
  const closeEdit = () => { if (editSaving) return; setEditTarget(null); setEditError(""); };

  // Backend: PUT /customers/:id → { success, customer }
  const handleEditSubmit = async (formData) => {
    setEditSaving(true);
    setEditError("");
    try {
      const res = await api.put(`/customers/${editTarget._id}`, formData);
      if (res.data.success) {
        setCustomers((prev) =>
          prev.map((c) => (c._id === editTarget._id ? res.data.customer : c))
        );
        setEditTarget(null);
      } else {
        setEditError("Update failed — please try again.");
      }
    } catch (err) {
      setEditError(err.response?.data?.message ?? "An error occurred while saving.");
    } finally {
      setEditSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const openDeleteConfirm  = (id) => { setDeleteId(id); setDeleteError(""); };
  const closeDeleteConfirm = () => { if (deleting) return; setDeleteId(null); setDeleteError(""); };

  // Backend: DELETE /customers/:id → { success, message }
  const handleDeleteConfirm = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await api.delete(`/customers/${deleteId}`);
      setCustomers((prev) => prev.filter((c) => c._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setDeleteError(err.response?.data?.message ?? "Could not delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const deleteName = deleteId
    ? (customers.find((c) => c._id === deleteId)?.name ?? "this customer")
    : "";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
        }

        .main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 36px 24px 72px;
        }

        /* Page header */
        .page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .page-title {
          font-family: 'Sora', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .page-sub { font-size: 14px; color: #64748b; }

        /* Add button */
        .btn-add {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          transition: box-shadow 0.15s, transform 0.15s;
        }
        .btn-add:hover { box-shadow: 0 6px 20px rgba(99,102,241,0.45); transform: translateY(-1px); }
        .btn-add svg { font-size: 16px; }

        /* Toolbar */
        .toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        /* Search */
        .search-wrap {
          position: relative;
          flex: 1;
          min-width: 200px;
          max-width: 360px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 16px;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 9px 36px 9px 38px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .search-input::placeholder { color: #94a3b8; }
        .search-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .search-clear {
          position: absolute;
          right: 9px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
          font-size: 16px;
          transition: color 0.12s;
        }
        .search-clear:hover { color: #475569; }

        /* Status filter pills */
        .filter-group { display: flex; gap: 6px; flex-wrap: wrap; }
        .filter-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .filter-btn:hover { border-color: #c7d2fe; color: #4f46e5; background: #f5f3ff; }
        .filter-btn--active {
          background: #6366f1;
          border-color: #6366f1;
          color: #fff;
          box-shadow: 0 2px 8px rgba(99,102,241,0.3);
        }
        .filter-btn--active:hover { background: #5254cc; border-color: #5254cc; color: #fff; }

        /* Result count */
        .result-count { font-size: 13px; color: #64748b; margin-bottom: 20px; }
        .result-count strong { color: #0f172a; font-weight: 600; }

        /* Card grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 18px;
        }

        /* Loading state */
        .state-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 80px 20px;
          color: #64748b;
          font-size: 14px;
        }
        .spinner {
          width: 22px;
          height: 22px;
          border: 2.5px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error banner */
        .error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 14px;
          margin-bottom: 22px;
        }
        .error-icon { font-size: 17px; flex-shrink: 0; }
        .error-retry {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 7px;
          border: 1px solid #fca5a5;
          background: #fff;
          color: #dc2626;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .error-retry:hover { background: #fee2e2; }

        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 72px 20px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          text-align: center;
        }
        .empty-state__emoji { font-size: 36px; line-height: 1; }
        .empty-state__title {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #334155;
          margin-top: 4px;
        }
        .empty-state__sub { font-size: 14px; color: #94a3b8; }

        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: overlay-in 0.15s ease;
        }
        @keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Edit modal */
        .modal-box {
          background: #fff;
          border-radius: 18px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 64px rgba(15,23,42,0.22);
          animation: modal-up 0.2s ease;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 26px 18px;
          border-bottom: 1px solid #f1f5f9;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 1;
        }
        .modal-title {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
        }
        .modal-close {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 19px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          flex-shrink: 0;
        }
        .modal-close:hover { background: #e2e8f0; color: #0f172a; }
        .modal-close:disabled { opacity: 0.5; cursor: not-allowed; }
        .modal-body { padding: 22px 26px 26px; }
        .modal-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 18px;
        }

        /* Delete confirm */
        .confirm-box {
          background: #fff;
          border-radius: 18px;
          width: 100%;
          max-width: 400px;
          padding: 36px 30px;
          text-align: center;
          box-shadow: 0 24px 64px rgba(15,23,42,0.22);
          animation: modal-up 0.2s ease;
        }
        .confirm-icon-wrap {
          width: 60px;
          height: 60px;
          background: #fff1f2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          font-size: 26px;
          color: #e11d48;
        }
        .confirm-title {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .confirm-msg {
          font-size: 14px;
          color: #64748b;
          line-height: 1.65;
        }
        .confirm-name { font-weight: 600; color: #0f172a; }
        .confirm-error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 14px;
          padding: 9px 14px;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
          font-size: 13px;
        }
        .confirm-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 24px;
        }
        .btn-cancel {
          padding: 10px 22px;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          background: #fff;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .btn-cancel:hover:not(:disabled) { background: #f1f5f9; border-color: #cbd5e1; }
        .btn-cancel:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border: none;
          border-radius: 9px;
          background: #e11d48;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(225,29,72,0.3);
          transition: background 0.15s, box-shadow 0.15s;
        }
        .btn-delete:hover:not(:disabled) { background: #be123c; box-shadow: 0 5px 14px rgba(225,29,72,0.4); }
        .btn-delete:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-delete svg { font-size: 16px; }
        .btn-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .page-header { flex-direction: column; align-items: stretch; }
          .btn-add { justify-content: center; }
          .search-wrap { max-width: 100%; }
          .modal-header { padding: 18px 18px 14px; }
          .modal-body   { padding: 16px 18px 22px; }
          .confirm-box  { padding: 28px 20px; }
        }
      `}</style>

      <div className="page">
        <Navbar />

        <main className="main">

          {/* ── Page header ─────────────────────────────────────────────── */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Customers</h1>
              <p className="page-sub">Manage and track all your customer relationships.</p>
            </div>
            <Link href="/customers/add" className="btn-add">
              <RiUserAddLine /> Add Customer
            </Link>
          </div>

          {/* ── Fetch error ──────────────────────────────────────────────── */}
          {fetchError && (
            <ErrorBanner message={fetchError} onRetry={fetchCustomers} />
          )}

          {/* ── Toolbar ──────────────────────────────────────────────────── */}
          <div className="toolbar">
            {/* Search input */}
            <div className="search-wrap">
              <RiSearchLine className="search-icon" aria-hidden="true" />
              <input
                className="search-input"
                type="search"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search customers by name"
              />
              {search && (
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <RiCloseLine />
                </button>
              )}
            </div>

            {/* Status filter buttons */}
            <div className="filter-group" role="group" aria-label="Filter by status">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  className={`filter-btn${statusFilter === s ? " filter-btn--active" : ""}`}
                  onClick={() => setStatusFilter(s)}
                  aria-pressed={statusFilter === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Result count ─────────────────────────────────────────────── */}
          {!loading && !fetchError && (
            <p className="result-count">
              Showing <strong>{filtered.length}</strong> of{" "}
              <strong>{customers.length}</strong>{" "}
              customer{customers.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* ── Loading / empty / grid ───────────────────────────────────── */}
          {loading ? (
            <Spinner label="Loading customers..." />
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__emoji">
                {customers.length === 0 ? "🏁" : "🔍"}
              </span>
              <p className="empty-state__title">
                {customers.length === 0 ? "No customers yet" : "No results found"}
              </p>
              <p className="empty-state__sub">
                {customers.length === 0
                  ? "Add your first customer to get started."
                  : "Try a different name or adjust the status filter."}
              </p>
            </div>
          ) : (
            <div className="cards-grid">
              {filtered.map((customer) => (
                <CustomerCard
                  key={customer._id}
                  customer={customer}
                  onEdit={openEdit}
                  onDelete={openDeleteConfirm}
                />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* ── Edit modal ──────────────────────────────────────────────────────── */}
      {editTarget && (
        <Modal onClose={closeEdit}>
          <div className="modal-box">
            <div className="modal-header">
              <h2 className="modal-title">Edit Customer</h2>
              <button
                className="modal-close"
                onClick={closeEdit}
                disabled={editSaving}
                aria-label="Close"
              >
                <RiCloseLine />
              </button>
            </div>
            <div className="modal-body">
              {editError && (
                <div className="modal-error">
                  <RiAlertLine /> {editError}
                </div>
              )}
              {/*
                CustomerForm receives the full customer object as initialData.
                Because initialData._id is truthy, the submit button reads
                "Update Customer" automatically (handled inside CustomerForm).
              */}
              <CustomerForm
                initialData={editTarget}
                onSubmit={handleEditSubmit}
                onCancel={closeEdit}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete confirm dialog ────────────────────────────────────────────── */}
      {deleteId && (
        <Modal onClose={closeDeleteConfirm}>
          <div className="confirm-box">
            <div className="confirm-icon-wrap" aria-hidden="true">
              <RiDeleteBinLine />
            </div>
            <h2 className="confirm-title">Delete customer?</h2>
            <p className="confirm-msg">
              You are about to permanently delete{" "}
              <span className="confirm-name">{deleteName}</span>.
              This action cannot be undone.
            </p>
            {deleteError && (
              <div className="confirm-error">
                <RiAlertLine /> {deleteError}
              </div>
            )}
            <div className="confirm-actions">
              <button
                className="btn-cancel"
                onClick={closeDeleteConfirm}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn-delete"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting
                  ? <><span className="btn-spinner" /> Deleting...</>
                  : <><RiDeleteBinLine /> Yes, Delete</>
                }
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function CustomersPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Customers — CRM System</title>
      </Head>
      <CustomersContent />
    </ProtectedRoute>
  );
}