const express = require("express");
const router  = express.Router();

const { protect } = require("../middleware/auth");
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// All routes below require a valid JWT ──────────────────────────────────────
router.use(protect);

// ── Collection routes ────────────────────────────────────────────────────────
router
  .route("/")
  .get(getAllCustomers)   // GET  /api/customers?search=&status=
  .post(createCustomer); // POST /api/customers

// ── Document routes ──────────────────────────────────────────────────────────
router
  .route("/:id")
  .get(getCustomerById)    // GET    /api/customers/:id
  .put(updateCustomer)     // PUT    /api/customers/:id
  .delete(deleteCustomer); // DELETE /api/customers/:id

module.exports = router;
