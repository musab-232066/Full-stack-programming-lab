import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

/**
 * Root index page.
 * Redirects authenticated users to /dashboard and everyone else to /login.
 * Uses useEffect so the AuthContext (which runs client-side) is available.
 */
export default function IndexPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(user && token ? "/dashboard" : "/login");
    }
  }, [loading, user, token, router]);

  return (
    <>
      <Head>
        <title>CRM</title>
      </Head>
      {/* Blank screen while the redirect decision is made */}
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.1)",
            borderTopColor: "#3b82f6",
            animation: "spin 0.75s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
}
