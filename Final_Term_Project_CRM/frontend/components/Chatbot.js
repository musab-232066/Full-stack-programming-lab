import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const COMMANDS = {
  hi: "Hello! I'm your CRM assistant. Type 'help' to see available commands.",
  hello:
    "Hello! I'm your CRM assistant. Type 'help' to see available commands.",
  help: `Here are the available commands:\n• 'show customers' — View all customers\n• 'add customer' — Go to add customer form\n• 'invoices' — Go to invoices page\n• 'generate invoice' — Go to invoice generation\n• 'dashboard' — Go to dashboard\n• 'logout' — Log out of the system`,
  "show customers": "Opening customers list...",
  "add customer": "Opening add customer form...",
  invoices: "Opening invoices...",
  "generate invoice": "Opening invoice generator...",
  dashboard: "Going to dashboard...",
  logout: "Logging you out...",
};

const NAV_COMMANDS = {
  "show customers": "/customers",
  "add customer": "/customers/add",
  invoices: "/invoices",
  "generate invoice": "/invoices/generate",
  dashboard: "/dashboard",
};

const INITIAL_MESSAGE = {
  id: 1,
  from: "bot",
  text: "Hi! I'm your CRM Assistant. Type 'help' to see what I can do.",
  timestamp: new Date(),
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MessageBubble({ msg }) {
  const isUser = msg.from === "user";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
        gap: "3px",
      }}
    >
      {!isUser && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "2px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaRobot style={{ color: "#38bdf8", fontSize: "10px" }} />
          </div>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
            CRM Assistant
          </span>
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          padding: "9px 13px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? "#2563eb" : "#f1f5f9",
          color: isUser ? "#fff" : "#1e293b",
          fontSize: "13.5px",
          lineHeight: "1.55",
          whiteSpace: "pre-line",
          boxShadow: "0 1px 2px rgba(0,0,0,0.07)",
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
      <span style={{ fontSize: "10px", color: "#94a3b8" }}>
        {formatTime(msg.timestamp)}
      </span>
    </div>
  );
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const { logout } = useAuth();

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const addMessage = (from, text) => ({
    id: Date.now() + Math.random(),
    from,
    text,
    timestamp: new Date(),
  });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = addMessage("user", trimmed);
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const key = trimmed.toLowerCase();

    // Simulate a short bot "typing" delay
    setTimeout(() => {
      setIsTyping(false);

      let responseText = COMMANDS[key];
      if (!responseText) {
        responseText =
          "I don't understand that command. Type 'help' to see what I can do.";
      }

      setMessages((prev) => [...prev, addMessage("bot", responseText)]);

      // Navigation side-effects
      if (NAV_COMMANDS[key]) {
        router.push(NAV_COMMANDS[key]);
      }

      if (key === "logout") {
        setTimeout(() => logout(), 800);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "350px",
            height: "450px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
            animation: "chatSlideIn 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0f172a",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "rgba(56,189,248,0.15)",
                  border: "1.5px solid rgba(56,189,248,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaRobot style={{ color: "#38bdf8", fontSize: "15px" }} />
              </div>
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                  }}
                >
                  CRM Assistant
                </div>
                <div
                  style={{
                    color: "#38bdf8",
                    fontSize: "11px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }}
                  />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "8px",
                color: "#94a3b8",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              aria-label="Close chat"
            >
              <FaTimes style={{ fontSize: "12px" }} />
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px 8px",
              background: "#fff",
              scrollbarWidth: "thin",
              scrollbarColor: "#e2e8f0 transparent",
            }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    background: "#f1f5f9",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "10px 14px",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#94a3b8",
                        display: "inline-block",
                        animation: `typingDot 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "12px 12px 14px",
              borderTop: "1px solid #e2e8f0",
              background: "#f8fafc",
              display: "flex",
              gap: "8px",
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              style={{
                flex: 1,
                padding: "9px 13px",
                borderRadius: "10px",
                border: "1.5px solid #e2e8f0",
                outline: "none",
                fontSize: "13.5px",
                background: "#fff",
                color: "#1e293b",
                transition: "border-color 0.15s",
                resize: "none",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: "none",
                background: input.trim() ? "#2563eb" : "#cbd5e1",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "not-allowed",
                transition: "background 0.15s, transform 0.1s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (input.trim())
                  e.currentTarget.style.background = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                if (input.trim())
                  e.currentTarget.style.background = "#2563eb";
              }}
              aria-label="Send message"
            >
              <FaPaperPlane style={{ fontSize: "13px" }} />
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle Button ────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#0f172a",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 8px 24px rgba(15,23,42,0.35), 0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 1001,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow =
            "0 12px 32px rgba(15,23,42,0.45), 0 4px 12px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(15,23,42,0.35), 0 2px 8px rgba(0,0,0,0.2)";
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <FaTimes style={{ color: "#fff", fontSize: "20px" }} />
        ) : (
          <FaComments style={{ color: "#38bdf8", fontSize: "22px" }} />
        )}

        {/* Unread badge — shown only when closed */}
        {!open && (
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#22c55e",
              border: "2px solid #fff",
            }}
          />
        )}
      </button>

      {/* ── Keyframe animations (injected once) ─────────────────────────── */}
      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes typingDot {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </>
  );
}
