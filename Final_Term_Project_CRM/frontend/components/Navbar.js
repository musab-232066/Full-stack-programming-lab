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
  RiBillLine,
} from "react-icons/ri";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
    { href: "/customers", label: "Customers", icon: RiGroupLine },
    { href: "/customers/add", label: "Add Customer", icon: RiUserAddLine },
    { href: "/invoices", label: "Invoices", icon: RiBillLine },
  ];

  const isActive = (href) => {
    if (href === "/invoices") return router.pathname.startsWith("/invoices");
    return router.pathname === href;
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid #dde3f0;
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
          background: #2563eb;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 17px;
          box-shadow: 0 4px 12px rgba(37,99,235,0.25);
        }

        .navbar-logo-text {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: #1e293b;
          letter-spacing: -0.3px;
        }

        .navbar-logo-text span {
          color: #2563eb;
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
          color: #64748b;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: #f0f4ff;
          color: #1e293b;
          text-decoration: none;
        }

        .nav-link.active {
          background: #eff6ff;
          color: #2563eb;
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
          background: #eff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          font-size: 15px;
          border: 1px solid #dde3f0;
        }

        .navbar-username {
          font-size: 13.5px;
          font-weight: 500;
          color: #1e293b;
        }

        .navbar-divider {
          width: 1px;
          height: 24px;
          background: #dde3f0;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid #dde3f0;
          border-radius: 8px;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .logout-btn:hover {
          background: #fef2f2;
          border-color: #fecaca;
          color: #ef4444;
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