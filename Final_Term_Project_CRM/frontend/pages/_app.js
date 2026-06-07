// frontend/pages/_app.js
import "@/styles/globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { ToasterConfig } from "@/components/Toast";
import Chatbot from "@/components/Chatbot";

// ─── Inner wrapper so useAuth() is available (must be inside AuthProvider) ───
function AppContent({ Component, pageProps }) {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Component {...pageProps} />

      {/* Chatbot is only rendered when a user is logged in */}
      {user && <Chatbot />}

      {/* Global toast notifications */}
      <ToasterConfig />
    </>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}
