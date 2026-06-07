# Final Term Project — CRM System
## MERN + Next.js Stack

---

## Project Structure

```
Final_Term_Project_CRM/
├── backend/
│   ├── controllers/        ← Business logic (add per feature)
│   ├── middleware/         ← Auth guard, error handler, validators
│   ├── models/             ← Mongoose schemas
│   ├── routes/
│   │   ├── auth.js         ← /api/auth
│   │   ├── customers.js    ← /api/customers
│   │   └── invoices.js     ← /api/invoices
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── components/         ← Reusable UI components
    ├── context/
    │   └── AuthContext.js  ← Global auth state
    ├── pages/
    │   ├── _app.js         ← App shell + Toaster
    │   ├── index.js        ← Redirect guard
    │   ├── login.js        ← Login page
    │   └── dashboard.js    ← Protected dashboard
    ├── styles/
    │   └── globals.css     ← CSS reset + design tokens
    ├── utils/
    │   └── api.js          ← Axios instance (auth + 401 handling)
    ├── .env.local
    ├── next.config.js
    └── package.json
```

---

## Prerequisites

- Node.js ≥ 18
- MongoDB running locally (`mongod`)

---

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
npm run dev          # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev          # starts on http://localhost:3000
```

---

## API Endpoints (Stubbed — fill controllers to activate)

| Method | Route                  | Description            |
|--------|------------------------|------------------------|
| GET    | /                      | Health check           |
| POST   | /api/auth/register     | Register new user      |
| POST   | /api/auth/login        | Login, returns JWT     |
| GET    | /api/auth/me           | Get current user       |
| GET    | /api/customers         | List all customers     |
| POST   | /api/customers         | Create customer        |
| GET    | /api/customers/:id     | Get single customer    |
| PUT    | /api/customers/:id     | Update customer        |
| DELETE | /api/customers/:id     | Delete customer        |
| GET    | /api/invoices          | List all invoices      |
| POST   | /api/invoices          | Create invoice         |
| GET    | /api/invoices/:id      | Get single invoice     |
| PUT    | /api/invoices/:id      | Update invoice         |
| DELETE | /api/invoices/:id      | Delete invoice         |
| GET    | /api/invoices/:id/pdf  | Generate invoice PDF   |

---

## Environment Variables

### backend/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=crm_super_secret_key_2026
JWT_EXPIRES_IN=7d
```

### frontend/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---


## Next Steps

1. Add Mongoose models in `backend/models/` (User, Customer, Invoice)
2. Add JWT auth middleware in `backend/middleware/auth.js`
3. Fill controllers in `backend/controllers/`
4. Build pages in `frontend/pages/` (customers, invoices, register)
5. Add reusable components in `frontend/components/`
