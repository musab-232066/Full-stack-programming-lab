const Customer = require("../models/Customer");

// ─── GET /api/customers ───────────────────────────────────────────────────────
// Query params: ?search=<string>&status=<Lead|Active|Inactive>
const getAllCustomers = async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    // Search filter — case-insensitive match on name OR email
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ name: regex }, { email: regex }];
    }

    // Status filter — only applied when value is a valid enum entry
    const validStatuses = ["Lead", "Active", "Inactive"];
    if (status && validStatuses.includes(status)) {
      filter.status = status;
    }

    const customers = await Customer.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (err) {
    console.error("[getAllCustomers]", err.message);
    return res.status(500).json({ success: false, message: "Server error while fetching customers." });
  }
};

// ─── GET /api/customers/:id ───────────────────────────────────────────────────
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }

    return res.status(200).json({ success: true, customer });
  } catch (err) {
    console.error("[getCustomerById]", err.message);
    // Catch malformed ObjectId strings
    if (err.kind === "ObjectId") {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }
    return res.status(500).json({ success: false, message: "Server error while fetching customer." });
  }
};

// ─── POST /api/customers ──────────────────────────────────────────────────────
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, address, notes } = req.body;

    // Required-field validation before hitting Mongoose
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "name, email, and phone are required fields.",
      });
    }

    const customer = new Customer({ name, email, phone, company, status, address, notes });
    await customer.save();

    return res.status(201).json({ success: true, customer });
  } catch (err) {
    console.error("[createCustomer]", err.message);

    // Duplicate email (unique index violation)
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "A customer with this email already exists." });
    }
    // Mongoose validation errors (enum, required, etc.)
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    return res.status(500).json({ success: false, message: "Server error while creating customer." });
  }
};

// ─── PUT /api/customers/:id ───────────────────────────────────────────────────
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }

    return res.status(200).json({ success: true, customer });
  } catch (err) {
    console.error("[updateCustomer]", err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "A customer with this email already exists." });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    return res.status(500).json({ success: false, message: "Server error while updating customer." });
  }
};

// ─── DELETE /api/customers/:id ────────────────────────────────────────────────
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }

    return res.status(200).json({ success: true, message: "Customer deleted." });
  } catch (err) {
    console.error("[deleteCustomer]", err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }
    return res.status(500).json({ success: false, message: "Server error while deleting customer." });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
