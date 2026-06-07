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
        {/* Subtle grid backdrop */}
        <div style={s.grid} aria-hidden />

        <div style={s.card}>
          {/* Logotype */}
          <div style={s.brand}>
            <span style={s.brandDot} />
            <span style={s.brandName}>CRM</span>
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
                  <circle cx="8" cy="8" r="7.5" stroke="#f87171" />
                  <path d="M8 4.5v4M8 10.5v1" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
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
        body { background: #0f172a; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: #475569; }
        input:focus { outline: none; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,.18) !important; }
        button:hover:not(:disabled) { background: #2563eb !important; transform: translateY(-1px); }
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
    background: "#0f172a",
    fontFamily: "'Sora', sans-serif",
    padding: "24px 16px",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 20,
    padding: "44px 40px 36px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 24px 64px rgba(0,0,0,.5)",
    animation: "fadeUp .45s ease both",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#3b82f6",
    display: "block",
    boxShadow: "0 0 10px #3b82f6",
  },
  brandName: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.18em",
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 26,
    fontWeight: 600,
    color: "#f1f5f9",
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
    color: "#94a3b8",
    letterSpacing: "0.02em",
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#f1f5f9",
    transition: "border-color .2s, box-shadow .2s",
    fontFamily: "inherit",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.25)",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#fca5a5",
  },
  btn: {
    marginTop: 4,
    padding: "12px",
    background: "#3b82f6",
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
    color: "#475569",
  },
  link: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: 500,
  },
};
