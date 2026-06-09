import { useEffect, useState } from "react";

const _listeners = [];

function _emit(toast) {
  _listeners.forEach((fn) => fn(toast));
}

export const toastHelper = {
  success: (message, duration = 3500) => _emit({ type: "success", message, duration }),
  error:   (message, duration = 4500) => _emit({ type: "error",   message, duration }),
  info:    (message, duration = 3500) => _emit({ type: "info",    message, duration }),
  warning: (message, duration = 4000) => _emit({ type: "warning", message, duration }),
};

const ICONS = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

const STYLES = {
  success: { bg: "#f0fdf4", border: "#86efac", icon: "#16a34a", text: "#14532d", progress: "#16a34a" },
  error:   { bg: "#fff5f5", border: "#fca5a5", icon: "#dc2626", text: "#7f1d1d", progress: "#dc2626" },
  warning: { bg: "#fffbeb", border: "#fcd34d", icon: "#d97706", text: "#78350f", progress: "#d97706" },
  info:    { bg: "#eff6ff", border: "#93c5fd", icon: "#2563eb", text: "#1e3a5f", progress: "#2563eb" },
};

// ─── Single toast item ────────────────────────────────────────────────────────

function ToastItem({ id, type, message, duration, onRemove }) {
  const [visible,  setVisible]  = useState(false);   // drives enter animation
  const [progress, setProgress] = useState(100);      // width of progress bar

  // Trigger enter on next tick
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16);
    return () => clearTimeout(t);
  }, []);

  // Progress bar countdown
  useEffect(() => {
    const interval = 50; // ms between ticks
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) { clearInterval(timer); return 0; }
        return p - step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [duration]);

  // Auto-dismiss after duration
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(id), 300); // wait for exit animation
    }, duration);
    return () => clearTimeout(t);
  }, [id, duration, onRemove]);

  const s = STYLES[type] || STYLES.info;

  return (
    <div
      className={`toast-item toast-item--${visible ? "in" : "out"}`}
      style={{ "--toast-bg": s.bg, "--toast-border": s.border, "--toast-icon": s.icon, "--toast-text": s.text, "--toast-progress": s.progress }}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-icon">{ICONS[type]}</span>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={() => { setVisible(false); setTimeout(() => onRemove(id), 300); }}
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div
        className="toast-progress"
        style={{ width: `${progress}%`, background: s.progress }}
      />
    </div>
  );
}

// ─── Toast container ──────────────────────────────────────────────────────────

let _nextId = 1;

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = ({ type, message, duration }) => {
      const id = _nextId++;
      setToasts((prev) => [...prev, { id, type, message, duration }]);
    };
    _listeners.push(handler);
    return () => {
      const i = _listeners.indexOf(handler);
      if (i > -1) _listeners.splice(i, 1);
    };
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

        .toast-container {
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          font-family: 'DM Sans', sans-serif;
        }

        .toast-item {
          pointer-events: all;
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-width: 280px;
          max-width: 380px;
          padding: 13px 14px 16px;
          background: var(--toast-bg);
          border: 1px solid var(--toast-border);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.06);
          overflow: hidden;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .toast-item--in  { opacity: 1; transform: translateX(0); }
        .toast-item--out { opacity: 0; transform: translateX(24px); }

        .toast-icon {
          flex-shrink: 0;
          color: var(--toast-icon);
          margin-top: 1px;
          display: flex;
          align-items: center;
        }

        .toast-message {
          flex: 1;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--toast-text);
          line-height: 1.45;
          padding-right: 4px;
          word-break: break-word;
        }

        .toast-close {
          flex-shrink: 0;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--toast-icon);
          opacity: 0.6;
          display: flex;
          align-items: center;
          transition: opacity 0.15s;
          margin-top: 1px;
        }
        .toast-close:hover { opacity: 1; }

        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          border-radius: 0 0 12px 12px;
          transition: width 50ms linear;
          opacity: 0.7;
        }

        @media (max-width: 480px) {
          .toast-container { right: 12px; left: 12px; top: 72px; }
          .toast-item { min-width: unset; max-width: 100%; }
        }
      `}</style>

      <div className="toast-container" aria-label="Notifications">
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            id={t.id}
            type={t.type}
            message={t.message}
            duration={t.duration}
            onRemove={remove}
          />
        ))}
      </div>
    </>
  );
}

export { Toast as ToasterConfig };