import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import {
  RiDashboardLine,
  RiGroupLine,
  RiUserAddLine,
  RiLogoutBoxLine,
  RiUserSmileLine,
  RiBriefcaseLine,
} from "react-icons/ri";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
    { href: "/customers", label: "Customers", icon: RiGroupLine },
    { href: "/customers/add", label: "Add Customer", icon: RiUserAddLine },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #0f172a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', sans-serif;
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar-logo-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 17px;
          box-shadow: 0 4px 12px rgba(99,102,241,0.4);
        }

        .navbar-logo-text {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .navbar-logo-text span {
          color: #818cf8;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          padding: 0 24px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.07);
          color: #e2e8f0;
        }

        .nav-link.active {
          background: rgba(99,102,241,0.18);
          color: #a5b4fc;
        }

        .nav-link svg {
          font-size: 16px;
          flex-shrink: 0;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .navbar-user {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .navbar-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #334155, #475569);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          font-size: 15px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .navbar-username {
          font-size: 13.5px;
          font-weight: 500;
          color: #cbd5e1;
        }

        .navbar-divider {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #94a3b8;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .logout-btn:hover {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        .logout-btn svg {
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .navbar-username { display: none; }
          .navbar-divider { display: none; }
          .nav-link span { display: none; }
          .navbar-nav { padding: 0 8px; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/dashboard" className="navbar-logo">
            <div className="navbar-logo-icon">
              <RiBriefcaseLine />
            </div>
            <span className="navbar-logo-text">
              CRM <span>System</span>
            </span>
          </Link>

          <div className="navbar-nav">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${isActive(href) ? "active" : ""}`}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="navbar-right">
            {user && (
              <div className="navbar-user">
                <div className="navbar-avatar">
                  <RiUserSmileLine />
                </div>
                <span className="navbar-username">{user.name}</span>
              </div>
            )}
            <div className="navbar-divider" />
            <button className="logout-btn" onClick={logout}>
              <RiLogoutBoxLine />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
