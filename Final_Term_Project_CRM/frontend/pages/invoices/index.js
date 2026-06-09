import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../utils/api";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
  RiFileTextLine,
  RiDownloadLine,
  RiAddLine,
  RiSearchLine,
  RiCalendarLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/invoices");
      setInvoices(data.invoices || []);
    } catch (err) {
      setError("Failed to load invoices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (invoice) => {
    setDownloading(invoice._id);
    try {
      const response = await api.get(`/invoices/download/${invoice._id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${invoice._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      inv._id?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .inv-page {
          min-height: calc(100vh - 64px);
          background: #f8fafc;
          padding: 36px 24px 60px;
          font-family: 'DM Sans', sans-serif;
        }

        .inv-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Header */
        .inv-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .inv-header-left h1 {
          font-family: 'Sora', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
        }

        .inv-header-left p {
          font-size: 14px;
          color: #64748b;
          margin-top: 4px;
        }

        .inv-generate-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .inv-generate-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.45);
        }

        /* Stats */
        .inv-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: #fff;
          border-radius: 14px;
          padding: 20px 22px;
          border: 1px solid #e8edf5;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .stat-icon.purple { background: rgba(99,102,241,0.1); color: #6366f1; }
        .stat-icon.green  { background: rgba(16,185,129,0.1); color: #10b981; }
        .stat-icon.blue   { background: rgba(59,130,246,0.1); color: #3b82f6; }

        .stat-label {
          font-size: 12.5px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2px;
        }

        /* Search */
        .inv-search-wrap {
          position: relative;
          margin-bottom: 20px;
          max-width: 360px;
        }

        .inv-search-wrap svg {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 16px;
        }

        .inv-search {
          width: 100%;
          padding: 10px 14px 10px 38px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1e293b;
          outline: none;
          transition: border-color 0.15s;
        }

        .inv-search:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        /* Table Card */
        .inv-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e8edf5;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .inv-table-wrap {
          overflow-x: auto;
        }

        .inv-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .inv-table thead {
          background: #f8fafc;
          border-bottom: 1px solid #e8edf5;
        }

        .inv-table th {
          padding: 13px 20px;
          text-align: left;
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #64748b;
          white-space: nowrap;
        }

        .inv-table td {
          padding: 15px 20px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .inv-table tbody tr:last-child td {
          border-bottom: none;
        }

        .inv-table tbody tr:hover td {
          background: #fafbff;
        }

        .inv-id {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .inv-customer-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .inv-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          flex-shrink: 0;
        }

        .inv-customer-name {
          font-weight: 500;
          color: #1e293b;
        }

        .inv-amount {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          color: #0f172a;
        }

        .inv-date {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 13.5px;
        }

        .inv-date svg { font-size: 14px; color: #94a3b8; }

        .inv-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
          text-decoration: none;
          border: none;
        }

        .action-btn.pdf {
          background: rgba(99,102,241,0.08);
          color: #6366f1;
          border: 1px solid rgba(99,102,241,0.2);
        }

        .action-btn.pdf:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
        }

        .action-btn.pdf:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .action-btn svg { font-size: 15px; }

        /* Empty / Loading */
        .inv-empty {
          padding: 64px 24px;
          text-align: center;
        }

        .inv-empty-icon {
          width: 60px;
          height: 60px;
          background: #f1f5f9;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #94a3b8;
          margin: 0 auto 16px;
        }

        .inv-empty h3 {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .inv-empty p {
          font-size: 14px;
          color: #64748b;
        }

        .inv-loading {
          padding: 60px 24px;
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
        }

        .inv-error {
          padding: 24px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 14px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .inv-stats { grid-template-columns: 1fr; }
          .inv-header { flex-direction: column; }
          .inv-generate-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="inv-page">
        <div className="inv-container">

          {/* Header */}
          <div className="inv-header">
            <div className="inv-header-left">
              <h1>Invoices</h1>
              <p>Manage and download all customer invoices</p>
            </div>
            <Link href="/invoices/generate" className="inv-generate-btn">
              <RiAddLine />
              Generate Invoice
            </Link>
          </div>

          {/* Stats */}
          {!loading && !error && (
            <div className="inv-stats">
              <div className="stat-card">
                <div className="stat-icon purple"><RiFileTextLine /></div>
                <div>
                  <div className="stat-label">Total Invoices</div>
                  <div className="stat-value">{invoices.length}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green"><RiMoneyDollarCircleLine /></div>
                <div>
                  <div className="stat-label">Total Revenue</div>
                  <div className="stat-value">
                    {formatAmount(invoices.reduce((s, i) => s + (i.totalAmount || 0), 0))}
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon blue"><RiUserLine /></div>
                <div>
                  <div className="stat-label">Unique Customers</div>
                  <div className="stat-value">
                    {new Set(invoices.map((i) => i.customerId)).size}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <div className="inv-error">{error}</div>}

          {/* Search */}
          {!loading && !error && (
            <div className="inv-search-wrap">
              <RiSearchLine />
              <input
                className="inv-search"
                placeholder="Search by customer or invoice ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          {/* Table */}
          <div className="inv-card">
            {loading ? (
              <div className="inv-loading">Loading invoices…</div>
            ) : filtered.length === 0 ? (
              <div className="inv-empty">
                <div className="inv-empty-icon"><RiFileTextLine /></div>
                <h3>{search ? "No matching invoices" : "No invoices yet"}</h3>
                <p>
                  {search
                    ? "Try a different search term."
                    : "Generate your first invoice to get started."}
                </p>
              </div>
            ) : (
              <div className="inv-table-wrap">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Customer</th>
                      <th>Total Amount</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((inv) => (
                      <tr key={inv._id}>
                        <td>
                          <span className="inv-id">
                            #{inv._id?.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="inv-customer-cell">
                            <div className="inv-avatar">
                              {inv.customerName?.[0]?.toUpperCase() || "?"}
                            </div>
                            <span className="inv-customer-name">
                              {inv.customerName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="inv-amount">
                            {formatAmount(inv.totalAmount)}
                          </span>
                        </td>
                        <td>
                          <span className="inv-date">
                            <RiCalendarLine />
                            {formatDate(inv.date)}
                          </span>
                        </td>
                        <td>
                          <div className="inv-actions">
                            <button
                              className="action-btn pdf"
                              onClick={() => handleDownload(inv)}
                              disabled={downloading === inv._id}
                            >
                              <RiDownloadLine />
                              {downloading === inv._id ? "…" : "View PDF"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Invoices() {
  return (
    <ProtectedRoute>
      <InvoicesPage />
    </ProtectedRoute>
  );
}
