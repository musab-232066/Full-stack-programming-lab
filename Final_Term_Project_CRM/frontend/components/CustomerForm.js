import { useState } from "react";
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiBuildingLine,
  RiMapPinLine,
  RiFileTextLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "Lead",
  address: "",
  notes: "",
};

export default function CustomerForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData ? { ...EMPTY_FORM, ...initialData } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(initialData?._id);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) errs.phone = "Phone is required.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      icon: RiUserLine,
      placeholder: "Jane Smith",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      icon: RiMailLine,
      placeholder: "jane@company.com",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      icon: RiPhoneLine,
      placeholder: "+1 (555) 000-0000",
      required: true,
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      icon: RiBuildingLine,
      placeholder: "Acme Corp",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      icon: RiMapPinLine,
      placeholder: "123 Main St, City, Country",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600&family=DM+Sans:wght@400;500&display=swap');

        .cform {
          font-family: 'DM Sans', sans-serif;
        }

        .cform-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .cform-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cform-field.full {
          grid-column: 1 / -1;
        }

        .cform-label {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .cform-label svg {
          font-size: 14px;
          color: #6366f1;
        }

        .cform-required {
          color: #ef4444;
          margin-left: 1px;
        }

        .cform-input-wrap {
          position: relative;
        }

        .cform-input {
          width: 100%;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          box-sizing: border-box;
          outline: none;
        }

        .cform-input:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .cform-input.error {
          border-color: #ef4444;
          background: #fff5f5;
        }

        .cform-input.error:focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
        }

        .cform-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .cform-textarea {
          resize: vertical;
          min-height: 90px;
          line-height: 1.5;
        }

        .cform-error {
          font-size: 12px;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 1px;
        }

        .cform-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 8px;
          grid-column: 1 / -1;
        }

        .cform-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 22px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
        }

        .cform-btn svg {
          font-size: 16px;
        }

        .cform-btn-cancel {
          background: #f1f5f9;
          color: #475569;
          border: 1.5px solid #e2e8f0;
        }

        .cform-btn-cancel:hover {
          background: #e2e8f0;
        }

        .cform-btn-submit {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
        }

        .cform-btn-submit:hover:not(:disabled) {
          box-shadow: 0 6px 18px rgba(99,102,241,0.45);
          transform: translateY(-1px);
        }

        .cform-btn-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .cform-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 560px) {
          .cform-grid { grid-template-columns: 1fr; }
          .cform-field.full { grid-column: 1; }
        }
      `}</style>

      <form className="cform" onSubmit={handleSubmit} noValidate>
        <div className="cform-grid">
          {fields.map(({ name, label, type, icon: Icon, placeholder, required }) => (
            <div key={name} className="cform-field">
              <label className="cform-label">
                <Icon />
                {label}
                {required && <span className="cform-required">*</span>}
              </label>
              <input
                className={`cform-input${errors[name] ? " error" : ""}`}
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
              />
              {errors[name] && (
                <span className="cform-error">⚠ {errors[name]}</span>
              )}
            </div>
          ))}

          {/* Status select */}
          <div className="cform-field">
            <label className="cform-label">
              <RiFileTextLine />
              Status
            </label>
            <select
              className="cform-input cform-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Lead">Lead</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Notes textarea */}
          <div className="cform-field full">
            <label className="cform-label">
              <RiFileTextLine />
              Notes
            </label>
            <textarea
              className="cform-input cform-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this customer..."
            />
          </div>

          <div className="cform-actions">
            {onCancel && (
              <button
                type="button"
                className="cform-btn cform-btn-cancel"
                onClick={onCancel}
                disabled={submitting}
              >
                <RiCloseLine />
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="cform-btn cform-btn-submit"
              disabled={submitting}
            >
              {submitting ? (
                <span className="cform-spinner" />
              ) : (
                <RiCheckLine />
              )}
              {isEdit ? "Update Customer" : "Add Customer"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
