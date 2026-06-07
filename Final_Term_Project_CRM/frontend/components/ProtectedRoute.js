import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap any page with <ProtectedRoute> to require authentication.
 * Shows a centred spinner while the auth state is loading,
 * redirects to /login when unauthenticated, and renders children otherwise.
 */
export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !token) {
      router.push("/login");
    }
  }, [loading, user, token, router]);

  if (loading) {
    return (
      <div style={styles.screen}>
        <div style={styles.spinner} />
      </div>
    );
  }

  if (!user || !token) {
    // Redirect is in flight — render nothing to avoid a flash
    return null;
  }

  return children;
}

const styles = {
  screen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
  },
  spinner: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTopColor: "#3b82f6",
    animation: "spin 0.75s linear infinite",
  },
};
