import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("crm_token");
      const storedUser  = localStorage.getItem("crm_user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      // Malformed JSON or no access — start fresh
      localStorage.removeItem("crm_token");
      localStorage.removeItem("crm_user");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Persist a successful auth response and update state. */
  const login = (newToken, newUser) => {
    localStorage.setItem("crm_token", newToken);
    localStorage.setItem("crm_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  /** Clear session and send the user to /login. */
  const logout = () => {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Convenience hook — throws if used outside AuthProvider. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
