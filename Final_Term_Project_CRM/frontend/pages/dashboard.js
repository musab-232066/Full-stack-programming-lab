import { useEffect, useState } from "react";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import {
  RiGroupLine,
  RiUserStarLine,
  RiUserSearchLine,
  RiUserUnfollowLine,
  RiArrowRightLine,
  RiSparklingLine,
} from "react-icons/ri";
import Link from "next/link";

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="stat-card" style={{ "--accent": color, "--accent-bg": bg }}>
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/customers");
        if (res.data.success) setCustomers(res.data.customers);
        else setError("Failed to load customers.");
      } catch {
        setError("An error occurred while fetching customers.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const stats = {
    total:    customers.length,
    active:   customers.filter((c) => c.status === "Active").length,
    leads:    customers.filter((c) => c.status === "Lead").length,
    inactive: customers.filter((c) => c.status === "Inactive").length,
  };

  const recent = [...customers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const STATUS_CONFIG = {
    Lead:     { bg: "#fef9c3", color: "#854d0e" },
    Active:   { bg: "#dcfce7", color: "#166534" },
    Inactive: { bg: "#f1f5f9", color: "#475569" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
        }

        .dash-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 36px 24px 60px;
        }

        /* Welcome */
        .dash-welcome {
          margin-bottom: 32px;
          padding: 28px 32px;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          overflow: hidden;
          position: relative;
        }

        .dash-welcome::after {
          content: '';
          position: absolute;
          right: -40px;
          top: -40px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .welcome-text h1 {
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }

        .welcome-text p {
          font-size: 14px;
          color: #94a3b8;
        }

        .welcome-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.35);
          border-radius: 30px;
          padding: 8px 16px;
          color: #a5b4fc;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
        }

        .welcome-badge svg {
          font-size: 15px;
        }

        /* Stats */
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .stat-card:hover {
          box-shadow: 0 6px 24px rgba(15,23,42,0.08);
          transform: translateY(-2px);
        }

        .stat-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--accent-bg);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-value {
          font-family: 'Sora', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1;
        }

        .stat-label {
          font-size: 12.5px;
          color: #64748b;
          font-weight: 500;
        }

        /* Recent customers */
        .dash-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .dash-section-title {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #0f172a;
        }

        .dash-view-all {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13.5px;
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          transition: gap 0.15s;
        }

        .dash-view-all:hover {
          gap: 8px;
        }

        .recent-table-wrap {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
        }

        .recent-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .recent-table thead tr {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .recent-table th {
          padding: 12px 20px;
          text-align: left;
          font-size: 11.5px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .recent-table td {
          padding: 14px 20px;
          color: #374151;
          border-bottom: 1px solid #f1f5f9;
        }

        .recent-table tbody tr:last-child td {
          border-bottom: none;
        }

        .recent-table tbody tr {
          transition: background 0.1s;
        }

        .recent-table tbody tr:hover {
          background: #fafbff;
        }

        .table-name {
          font-weight: 500;
          color: #0f172a;
        }

        .table-email {
          color: #64748b;
          font-size: 13px;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        /* Loading */
        .dash-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          gap: 12px;
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
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .dash-error {
          color: #dc2626;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #94a3b8;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .dash-stats { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 580px) {
          .dash-stats { grid-template-columns: 1fr 1fr; }
          .dash-welcome { flex-direction: column; align-items: flex-start; }
          .recent-table th:nth-child(3),
          .recent-table td:nth-child(3) { display: none; }
        }
      `}</style>

      <div className="dash-page">
        <Navbar />
        <main className="dash-main">

          {/* Welcome */}
          <div className="dash-welcome">
            <div className="welcome-text">
              <h1>Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
              <p>Here's what's happening with your customers today.</p>
            </div>
            <div className="welcome-badge">
              <RiSparklingLine />
              CRM Overview
            </div>
          </div>

          {error && <div className="dash-error">{error}</div>}

          {loading ? (
            <div className="dash-loading">
              <div className="spinner" />
              Loading dashboard…
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="dash-stats">
                <StatCard icon={RiGroupLine}       label="Total Customers" value={stats.total}    color="#6366f1" bg="#ede9fe" />
                <StatCard icon={RiUserStarLine}    label="Active"          value={stats.active}   color="#16a34a" bg="#dcfce7" />
                <StatCard icon={RiUserSearchLine}  label="Leads"           value={stats.leads}    color="#ca8a04" bg="#fef9c3" />
                <StatCard icon={RiUserUnfollowLine} label="Inactive"       value={stats.inactive} color="#64748b" bg="#f1f5f9" />
              </div>

              {/* Recent Customers */}
              <div className="dash-section-header">
                <h2 className="dash-section-title">Recent Customers</h2>
                <Link href="/customers" className="dash-view-all">
                  View all <RiArrowRightLine />
                </Link>
              </div>

              <div className="recent-table-wrap">
                {recent.length === 0 ? (
                  <div className="empty-state">No customers yet. Add your first one!</div>
                ) : (
                  <table className="recent-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((c) => {
                        const sc = STATUS_CONFIG[c.status] || STATUS_CONFIG["Inactive"];
                        return (
                          <tr key={c._id}>
                            <td>
                              <div className="table-name">{c.name}</div>
                              <div className="table-email">{c.phone}</div>
                            </td>
                            <td>{c.email}</td>
                            <td>{c.company || "—"}</td>
                            <td>
                              <span
                                className="status-pill"
                                style={{ background: sc.bg, color: sc.color }}
                              >
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Head><title>Dashboard — CRM System</title></Head>
      <DashboardContent />
    </ProtectedRoute>
  );
}
