// frontend/pages/customers/add.js
//
// Fully self-contained Add Customer page.
// All 7 fields are rendered inline — no dependency on CustomerForm.
// API calls use the `api` instance from utils/api (path-only URLs).
// On success: fires toastHelper.success() then redirects to /customers.

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import ProtectedRoute       from "../../components/ProtectedRoute";
import Navbar               from "../../components/Navbar";
import Toast, { toastHelper } from "../../components/Toast";
import api                  from "../../utils/api";

import {
  RiArrowLeftLine,
  RiUserAddLine,
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiBuildingLine,
  RiMapPinLine,
  RiFileTextLine,
  RiBarChartLine,
  RiCheckLine,
  RiCloseLine,
  RiAlertLine,
} from "react-icons/ri";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  name:    "",
  email:   "",
  phone:   "",
  company: "",
  status:  "Lead",          // default
  address: "",
  notes:   "",
};

const STATUS_OPTIONS = ["Lead", "Active", "Inactive"];

const STATUS_COLORS = {
  Lead:     { bg: "#fef9c3", color: "#854d0e" },
  Active:   { bg: "#dcfce7", color: "#166534" },
  Inactive: { bg: "#f1f5f9", color: "#475569" },
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  return errors;
}

// ─── Field error message ─────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null;
  return (
    <span className="field-error" role="alert">
      <RiAlertLine /> {message}
    </span>
  );
}

// ─── Main page content ────────────────────────────────────────────────────────

function AddCustomerContent() {
  const router = useRouter();

  const [form,       setForm]       = useState({ ...INITIAL_FORM });
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ── Field change handler ───────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the per-field error as soon as the user edits the field
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    // Clear the global submit error when anything changes
    if (submitError) setSubmitError("");
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector(".field-error");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // POST /customers — api instance already has auth headers injected
      // Backend returns: { success: bool, customer: {...} }
      const res = await api.post("/customers", {
        name:    form.name.trim(),
        email:   form.email.trim(),
        phone:   form.phone.trim(),
        company: form.company.trim(),
        status:  form.status,
        address: form.address.trim(),
        notes:   form.notes.trim(),
      });

      if (res.data.success) {
        // Show success toast before navigating away
        toastHelper.success(
          `${form.name.trim()} has been added as a customer.`
        );
        // Small delay so the toast is visible for a moment
        setTimeout(() => router.push("/customers"), 1200);
      } else {
        setSubmitError("The server returned an unexpected response. Please try again.");
      }
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ??
        "An error occurred while creating the customer. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Cancel ─────────────────────────────────────────────────────────────────
  const handleCancel = () => router.push("/customers");

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Toast container — sits fixed top-right, receives events from toastHelper */}
      <Toast />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Page shell ──────────────────────────────────────────────────── */
        .page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
        }
        .main {
          max-width: 760px;
          margin: 0 auto;
          padding: 36px 24px 80px;
        }

        /* ── Breadcrumb ──────────────────────────────────────────────────── */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          font-size: 14px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          color: #475569;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: all 0.15s;
        }
        .back-link:hover {
          background: #f0f4ff;
          border-color: #c7d2fe;
          color: #4f46e5;
        }
        .back-link svg { font-size: 15px; }
        .breadcrumb-sep  { color: #cbd5e1; font-size: 16px; }
        .breadcrumb-curr { color: #64748b; font-size: 13.5px; }

        /* ── Card wrapper ────────────────────────────────────────────────── */
        .card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 20px rgba(15,23,42,0.07);
        }

        /* ── Card header ─────────────────────────────────────────────────── */
        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 26px 32px 22px;
          background: linear-gradient(110deg, #fafbff 0%, #ffffff 100%);
          border-bottom: 1px solid #f1f5f9;
        }
        .card-header-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #e0e7ff, #ede9fe);
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #6366f1;
          flex-shrink: 0;
        }
        .card-header-title {
          font-family: 'Sora', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .card-header-sub {
          font-size: 13.5px;
          color: #64748b;
        }

        /* ── Card body ───────────────────────────────────────────────────── */
        .card-body { padding: 30px 32px 32px; }

        /* ── Global submit error ─────────────────────────────────────────── */
        .submit-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px 16px;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 13.5px;
          line-height: 1.45;
          margin-bottom: 24px;
        }
        .submit-error svg { font-size: 17px; flex-shrink: 0; margin-top: 1px; }

        /* ── Section label ───────────────────────────────────────────────── */
        .section-label {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #f1f5f9;
        }

        /* ── Form grid ───────────────────────────────────────────────────── */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }
        .form-grid + .form-grid { margin-top: 28px; }

        /* ── Field ───────────────────────────────────────────────────────── */
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field--full { grid-column: 1 / -1; }

        /* ── Label ───────────────────────────────────────────────────────── */
        .field-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }
        .field-label svg { font-size: 14px; color: #6366f1; }
        .required-star { color: #ef4444; margin-left: 1px; }

        /* ── Input / Select / Textarea ───────────────────────────────────── */
        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }
        .field-input::placeholder,
        .field-textarea::placeholder { color: #94a3b8; }

        .field-input:focus,
        .field-select:focus,
        .field-textarea:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        /* Error state */
        .field-input--error,
        .field-select--error {
          border-color: #ef4444;
          background: #fff8f8;
        }
        .field-input--error:focus,
        .field-select--error:focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
        }

        /* Select — custom arrow */
        .field-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 13px center;
          padding-right: 36px;
          cursor: pointer;
        }

        /* Status select — colored preview next to the arrow */
        .status-select-wrap { position: relative; }
        .status-preview {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          transition: background 0.2s;
        }
        .status-select-wrap .field-select { padding-left: 28px; }

        /* Textarea */
        .field-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.55;
        }

        /* Hint */
        .field-hint {
          font-size: 12px;
          color: #94a3b8;
          margin-top: -2px;
        }

        /* Per-field error */
        .field-error {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #ef4444;
          margin-top: -2px;
        }
        .field-error svg { font-size: 13px; }

        /* ── Form actions ────────────────────────────────────────────────── */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
        }

        .btn-cancel {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 22px;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          background: #fff;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-cancel:hover:not(:disabled) { background: #f1f5f9; border-color: #cbd5e1; }
        .btn-cancel:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-cancel svg { font-size: 16px; }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 26px;
          border: none;
          border-radius: 9px;
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          transition: box-shadow 0.15s, transform 0.15s, opacity 0.15s;
        }
        .btn-submit:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(99,102,241,0.45);
          transform: translateY(-1px);
        }
        .btn-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .btn-submit svg { font-size: 16px; }

        /* Spinner inside submit button */
        .btn-submit-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Required note ───────────────────────────────────────────────── */
        .required-note {
          font-size: 12.5px;
          color: #94a3b8;
          margin-top: 20px;
        }
        .required-note span { color: #ef4444; }

        /* ── Responsive ──────────────────────────────────────────────────── */
        @media (max-width: 580px) {
          .form-grid { grid-template-columns: 1fr; }
          .field--full { grid-column: 1; }
          .card-header { padding: 20px; }
          .card-body   { padding: 20px; }
          .form-actions { flex-direction: column-reverse; }
          .btn-cancel, .btn-submit { justify-content: center; width: 100%; }
        }
      `}</style>

      <div className="page">
        <Navbar />

        <main className="main">

          {/* ── Breadcrumb ────────────────────────────────────────────────── */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/customers" className="back-link">
              <RiArrowLeftLine /> Customers
            </Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span className="breadcrumb-curr" aria-current="page">New Customer</span>
          </nav>

          {/* ── Form card ─────────────────────────────────────────────────── */}
          <div className="card">

            {/* Header */}
            <div className="card-header">
              <div className="card-header-icon" aria-hidden="true">
                <RiUserAddLine />
              </div>
              <div>
                <h1 className="card-header-title">Add New Customer</h1>
                <p className="card-header-sub">
                  Fill in the details below to create a new customer record.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="card-body">

              {/* Global API error */}
              {submitError && (
                <div className="submit-error" role="alert">
                  <RiAlertLine />
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                {/* ── Section 1: Contact details ─────────────────────────── */}
                <p className="section-label">Contact Details</p>

                <div className="form-grid">

                  {/* Name */}
                  <div className="field">
                    <label htmlFor="name" className="field-label">
                      <RiUserLine /> Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`field-input${errors.name ? " field-input--error" : ""}`}
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      autoFocus
                    />
                    <FieldError message={errors.name} />
                  </div>

                  {/* Email */}
                  <div className="field">
                    <label htmlFor="email" className="field-label">
                      <RiMailLine /> Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`field-input${errors.email ? " field-input--error" : ""}`}
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    <FieldError message={errors.email} />
                  </div>

                  {/* Phone */}
                  <div className="field">
                    <label htmlFor="phone" className="field-label">
                      <RiPhoneLine /> Phone Number <span className="required-star">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`field-input${errors.phone ? " field-input--error" : ""}`}
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                    <FieldError message={errors.phone} />
                  </div>

                  {/* Company */}
                  <div className="field">
                    <label htmlFor="company" className="field-label">
                      <RiBuildingLine /> Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="field-input"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </div>

                </div>

                {/* ── Section 2: Status & Location ───────────────────────── */}
                <p className="section-label" style={{ marginTop: 28 }}>Status & Location</p>

                <div className="form-grid">

                  {/* Status */}
                  <div className="field">
                    <label htmlFor="status" className="field-label">
                      <RiBarChartLine /> Status
                    </label>
                    <div className="status-select-wrap">
                      <span
                        className="status-preview"
                        style={{
                          background: STATUS_COLORS[form.status]?.color ?? "#94a3b8",
                        }}
                        aria-hidden="true"
                      />
                      <select
                        id="status"
                        name="status"
                        className="field-select"
                        value={form.status}
                        onChange={handleChange}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <span className="field-hint">
                      Describes where this contact is in your pipeline.
                    </span>
                  </div>

                  {/* Address */}
                  <div className="field">
                    <label htmlFor="address" className="field-label">
                      <RiMapPinLine /> Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="field-input"
                      placeholder="123 Main St, City, Country"
                      value={form.address}
                      onChange={handleChange}
                      autoComplete="street-address"
                    />
                  </div>

                </div>

                {/* ── Section 3: Notes ───────────────────────────────────── */}
                <p className="section-label" style={{ marginTop: 28 }}>Additional Notes</p>

                <div className="field">
                  <label htmlFor="notes" className="field-label">
                    <RiFileTextLine /> Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="field-textarea"
                    placeholder="Any context, background, or reminders about this customer..."
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                {/* ── Required note ──────────────────────────────────────── */}
                <p className="required-note">
                  Fields marked <span>*</span> are required.
                </p>

                {/* ── Actions ────────────────────────────────────────────── */}
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleCancel}
                    disabled={submitting}
                  >
                    <RiCloseLine /> Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="btn-submit-spinner" aria-hidden="true" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <RiCheckLine /> Add Customer
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function AddCustomerPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Add Customer — CRM System</title>
      </Head>
      <AddCustomerContent />
    </ProtectedRoute>
  );
}