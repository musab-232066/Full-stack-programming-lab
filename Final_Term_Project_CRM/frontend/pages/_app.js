// frontend/pages/_app.js
import "@/styles/globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ToasterConfig }         from "@/components/Toast";
import Chatbot                   from "@/components/Chatbot";

// ─── Inner wrapper so useAuth() is available (must be inside AuthProvider) ───
function AppContent({ Component, pageProps }) {
  const { user } = useAuth();

  return (
    <>
      {/*
        Each page (dashboard, customers/index, customers/add, etc.) renders
        its own <Navbar /> so it isn't mounted here — adding it here too would
        produce a double navbar on every route.
      */}
      <Component {...pageProps} />

      {/* Chatbot is only rendered when a user is logged in */}
      {user && <Chatbot />}

      {/*
        Global toast notifications.
        ToasterConfig is an alias for the <Toast /> container exported from
        @/components/Toast. Mount it once here so toastHelper.success() /
        .error() / .info() / .warning() work on every page automatically.
      */}
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