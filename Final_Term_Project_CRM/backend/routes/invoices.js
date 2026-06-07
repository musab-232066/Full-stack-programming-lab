const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const {
  getAllInvoices,
  getInvoicesByCustomer,
  createInvoice,
  downloadInvoicePDF,
} = require("../controllers/invoiceController");

// All routes are protected by JWT middleware
router.use(protect);

// GET  /api/invoices                      — list all invoices
router.get("/", getAllInvoices);

// GET  /api/invoices/customer/:customerId — invoices for one customer
router.get("/customer/:customerId", getInvoicesByCustomer);

// POST /api/invoices                      — create a new invoice
router.post("/", createInvoice);

// GET  /api/invoices/download/:id         — download invoice as PDF
router.get("/download/:id", downloadInvoicePDF);

module.exports = router;
