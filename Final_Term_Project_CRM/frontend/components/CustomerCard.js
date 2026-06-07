import {
  RiMailLine,
  RiPhoneLine,
  RiBuildingLine,
  RiEditLine,
  RiDeleteBinLine,
  RiUserLine,
} from "react-icons/ri";

const STATUS_CONFIG = {
  Lead:     { bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04" },
  Active:   { bg: "#dcfce7", color: "#166534", dot: "#16a34a" },
  Inactive: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
};

export default function CustomerCard({ customer, onEdit, onDelete }) {
  const { _id, name, email, phone, company, status } = customer;
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG["Inactive"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .ccard {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .ccard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .ccard:hover {
          box-shadow: 0 8px 32px rgba(15,23,42,0.10);
          transform: translateY(-2px);
          border-color: #c7d2fe;
        }

        .ccard:hover::before {
          opacity: 1;
        }

        .ccard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .ccard-identity {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .ccard-avatar {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #e0e7ff, #ede9fe);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366f1;
          font-size: 19px;
          flex-shrink: 0;
        }

        .ccard-name {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ccard-company {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: #64748b;
        }

        .ccard-company svg {
          font-size: 13px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .ccard-details {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ccard-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #475569;
        }

        .ccard-detail svg {
          font-size: 15px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .ccard-detail span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ccard-actions {
          display: flex;
          gap: 8px;
          padding-top: 4px;
          border-top: 1px solid #f1f5f9;
        }

        .ccard-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }

        .ccard-btn svg {
          font-size: 14px;
        }

        .ccard-btn-edit {
          background: #f0f4ff;
          color: #4f46e5;
          border-color: #e0e7ff;
        }

        .ccard-btn-edit:hover {
          background: #e0e7ff;
          border-color: #c7d2fe;
        }

        .ccard-btn-delete {
          background: #fff5f5;
          color: #dc2626;
          border-color: #fee2e2;
        }

        .ccard-btn-delete:hover {
          background: #fee2e2;
          border-color: #fecaca;
        }
      `}</style>

      <div className="ccard">
        <div className="ccard-header">
          <div className="ccard-identity">
            <div className="ccard-avatar">
              <RiUserLine />
            </div>
            <div style={{ minWidth: 0 }}>
              <p className="ccard-name">{name}</p>
              {company && (
                <div className="ccard-company">
                  <RiBuildingLine />
                  <span>{company}</span>
                </div>
              )}
            </div>
          </div>

          <span
            className="status-badge"
            style={{
              background: statusCfg.bg,
              color: statusCfg.color,
            }}
          >
            <span
              className="status-dot"
              style={{ background: statusCfg.dot }}
            />
            {status}
          </span>
        </div>

        <div className="ccard-details">
          <div className="ccard-detail">
            <RiMailLine />
            <span>{email}</span>
          </div>
          <div className="ccard-detail">
            <RiPhoneLine />
            <span>{phone}</span>
          </div>
        </div>

        <div className="ccard-actions">
          <button
            className="ccard-btn ccard-btn-edit"
            onClick={() => onEdit(customer)}
          >
            <RiEditLine /> Edit
          </button>
          <button
            className="ccard-btn ccard-btn-delete"
            onClick={() => onDelete(_id)}
          >
            <RiDeleteBinLine /> Delete
          </button>
        </div>
      </div>
    </>
  );
}
