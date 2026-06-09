import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });

      if (data.success) {
        login(data.token, data.user);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to connect. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In — CRM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={s.page}>
        <div style={s.card}>
          <div style={s.brand}>
            <div style={s.brandIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <span style={s.brandName}>CRM System</span>
          </div>

          <h1 style={s.heading}>Welcome back</h1>
          <p style={s.sub}>Sign in to your workspace</p>

          <form onSubmit={handleSubmit} noValidate style={s.form}>
            <div style={s.field}>
              <label style={s.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={s.input}
                placeholder="you@company.com"
              />
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={s.input}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={s.errorBox} role="alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7.5" stroke="#ef4444" />
                  <path d="M8 4.5v4M8 10.5v1" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={s.btn}>
              {loading ? <span style={s.btnSpinner} /> : "Sign in"}
            </button>
          </form>

          <p style={s.footer}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={s.link}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f4ff; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: #94a3b8; }
        input:focus { outline: none; border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,.15) !important; }
        button:hover:not(:disabled) { background: #1d4ed8 !important; transform: translateY(-1px); }
        button:active:not(:disabled) { transform: translateY(0); }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f4ff",
    fontFamily: "'Sora', sans-serif",
    padding: "24px 16px",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#ffffff",
    border: "1px solid #dde3f0",
    borderRadius: 20,
    padding: "44px 40px 36px",
    boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
    animation: "fadeUp .45s ease both",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    background: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
  },
  brandName: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1e293b",
    letterSpacing: "-0.2px",
  },
  heading: {
    fontSize: 26,
    fontWeight: 600,
    color: "#1e293b",
    letterSpacing: "-0.3px",
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 32,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#475569",
    letterSpacing: "0.02em",
  },
  input: {
    background: "#f8fafc",
    border: "1px solid #dde3f0",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#1e293b",
    transition: "border-color .2s, box-shadow .2s",
    fontFamily: "inherit",
    width: "100%",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#dc2626",
  },
  btn: {
    marginTop: 4,
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "background .2s, transform .15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
  },
  btnSpinner: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    animation: "spin 0.7s linear infinite",
    display: "inline-block",
  },
  footer: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
};