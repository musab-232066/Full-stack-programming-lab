const PDFDocument = require("pdfkit");
const Invoice = require("../models/Invoice");

/* ------------------------------------------------------------------ */
/*  GET /api/invoices                                                   */
/* ------------------------------------------------------------------ */
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch invoices",
    });
  }
};

/* ------------------------------------------------------------------ */
/*  GET /api/invoices/customer/:customerId                             */
/* ------------------------------------------------------------------ */
const getInvoicesByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const invoices = await Invoice.find({ customerId }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch invoices for customer",
    });
  }
};

/* ------------------------------------------------------------------ */
/*  POST /api/invoices                                                  */
/* ------------------------------------------------------------------ */
const createInvoice = async (req, res) => {
  try {
    const { customerId, customerName, services } = req.body;

    // --- Validation ---
    if (!customerId || !customerName) {
      return res.status(400).json({
        success: false,
        message: "customerId and customerName are required",
      });
    }

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one service is required",
      });
    }

    for (const svc of services) {
      if (!svc.name || svc.amount === undefined) {
        return res.status(400).json({
          success: false,
          message: "Each service must have a name and an amount",
        });
      }
    }

    // --- Derive totalAmount ---
    const totalAmount = services.reduce(
      (sum, svc) => sum + Number(svc.amount),
      0
    );

    const invoice = await Invoice.create({
      customerId,
      customerName,
      services,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create invoice",
    });
  }
};

/* ------------------------------------------------------------------ */
/*  GET /api/invoices/download/:id                                      */
/* ------------------------------------------------------------------ */
const downloadInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    /* ---------- PDF construction ---------- */
    const doc = new PDFDocument({ margin: 50 });

    // Response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="invoice-${invoice._id}.pdf"`
    );

    // Stream directly to the response
    doc.pipe(res);

    const COLORS = {
      primary: "#1a237e",   // deep indigo
      accent: "#283593",
      light: "#e8eaf6",
      text: "#212121",
      muted: "#757575",
      divider: "#9fa8da",
      white: "#ffffff",
    };

    const PAGE_W = doc.page.width;
    const MARGIN = 50;
    const INNER_W = PAGE_W - MARGIN * 2;

    /* ── Header banner ── */
    doc
      .rect(0, 0, PAGE_W, 80)
      .fill(COLORS.primary);

    doc
      .fillColor(COLORS.white)
      .fontSize(30)
      .font("Helvetica-Bold")
      .text("INVOICE", MARGIN, 22, { align: "left" });

    doc
      .fontSize(11)
      .font("Helvetica")
      .text("CRM System", 0, 30, { align: "right", width: PAGE_W - MARGIN });

    /* ── Meta block ── */
    const metaTop = 100;
    doc.fillColor(COLORS.muted).fontSize(9).font("Helvetica-Bold");

    const labelX = MARGIN;
    const valueX = MARGIN + 110;

    const meta = [
      ["Invoice ID:", invoice._id.toString()],
      ["Customer:",   invoice.customerName],
      [
        "Date:",
        new Date(invoice.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      ],
    ];

    meta.forEach(([label, value], i) => {
      const y = metaTop + i * 20;
      doc.fillColor(COLORS.muted).text(label, labelX, y);
      doc.fillColor(COLORS.text).font("Helvetica").text(value, valueX, y);
    });

    /* ── Divider ── */
    const dividerY = metaTop + meta.length * 20 + 16;
    doc
      .moveTo(MARGIN, dividerY)
      .lineTo(PAGE_W - MARGIN, dividerY)
      .strokeColor(COLORS.divider)
      .lineWidth(1)
      .stroke();

    /* ── Services table header ── */
    const tableTop = dividerY + 14;
    const COL = {
      service: MARGIN,
      amount: PAGE_W - MARGIN - 80,
    };
    const ROW_H = 24;

    // Header row background
    doc
      .rect(MARGIN, tableTop, INNER_W, ROW_H)
      .fill(COLORS.accent);

    doc
      .fillColor(COLORS.white)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Service", COL.service + 8, tableTop + 7)
      .text("Amount ($)", COL.amount, tableTop + 7, { width: 80, align: "right" });

    /* ── Service rows ── */
    invoice.services.forEach((svc, idx) => {
      const rowY = tableTop + ROW_H + idx * ROW_H;

      // Alternating row shading
      if (idx % 2 === 0) {
        doc
          .rect(MARGIN, rowY, INNER_W, ROW_H)
          .fill(COLORS.light);
      }

      doc
        .fillColor(COLORS.text)
        .fontSize(10)
        .font("Helvetica")
        .text(svc.name, COL.service + 8, rowY + 7)
        .text(
          svc.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          COL.amount,
          rowY + 7,
          { width: 80, align: "right" }
        );
    });

    /* ── Total row ── */
    const totalRowY =
      tableTop + ROW_H + invoice.services.length * ROW_H + 8;

    doc
      .moveTo(MARGIN, totalRowY)
      .lineTo(PAGE_W - MARGIN, totalRowY)
      .strokeColor(COLORS.divider)
      .lineWidth(0.5)
      .stroke();

    doc
      .rect(MARGIN, totalRowY + 6, INNER_W, ROW_H + 4)
      .fill(COLORS.primary);

    doc
      .fillColor(COLORS.white)
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("TOTAL", COL.service + 8, totalRowY + 13)
      .text(
        `$${invoice.totalAmount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        COL.amount,
        totalRowY + 13,
        { width: 80, align: "right" }
      );

    /* ── Footer ── */
    const footerY = doc.page.height - 50;
    doc
      .moveTo(MARGIN, footerY)
      .lineTo(PAGE_W - MARGIN, footerY)
      .strokeColor(COLORS.divider)
      .lineWidth(0.5)
      .stroke();

    doc
      .fillColor(COLORS.muted)
      .fontSize(8)
      .font("Helvetica")
      .text(
        "Thank you for your business — CRM System",
        MARGIN,
        footerY + 8,
        { align: "center", width: INNER_W }
      );

    doc.end();
  } catch (error) {
    // Guard: headers may already be sent (streaming started)
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to generate PDF",
      });
    }
  }
};

module.exports = {
  getAllInvoices,
  getInvoicesByCustomer,
  createInvoice,
  downloadInvoicePDF,
};
