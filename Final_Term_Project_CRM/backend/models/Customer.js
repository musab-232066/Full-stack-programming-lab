const mongoose = require("mongoose");

// ─── Customer Schema ──────────────────────────────────────────────────────────
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Lead", "Active", "Inactive"],
      default: "Lead",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ─── Seed Method ──────────────────────────────────────────────────────────────
customerSchema.statics.seedData = async function () {
  try {
    const count = await this.countDocuments();
    if (count > 0) {
      console.log(`ℹ️   Customers collection already has ${count} records — skipping seed.`);
      return;
    }

    const sampleCustomers = [
      // ── Leads (5) ──────────────────────────────────────────────────────────
      {
        name: "Bilal Ahmed",
        email: "bilal.ahmed@techpk.com",
        phone: "03001234567",
        company: "TechPK Solutions",
        status: "Lead",
        address: "Plot 12, Blue Area, Islamabad",
        notes: "Interested in enterprise CRM package. Follow up next week.",
      },
      {
        name: "Sana Malik",
        email: "sana.malik@nexuslogic.pk",
        phone: "03211987654",
        company: "Nexus Logic",
        status: "Lead",
        address: "Office 5, Gulberg III, Lahore",
        notes: "Attended webinar on 15 May. Requested a demo.",
      },
      {
        name: "Usman Tariq",
        email: "usman.tariq@swiftfreight.pk",
        phone: "03331122334",
        company: "Swift Freight Co.",
        status: "Lead",
        address: "Warehouse 8, Korangi Industrial Area, Karachi",
        notes: "Needs logistics tracking module. Budget TBD.",
      },
      {
        name: "Ayesha Qureshi",
        email: "ayesha.q@medicarepk.com",
        phone: "03451567890",
        company: "MediCare Pakistan",
        status: "Lead",
        address: "Clinic 3, F-8 Markaz, Islamabad",
        notes: "Referred by Dr. Imran. Interested in patient management module.",
      },
      {
        name: "Hamza Raza",
        email: "hamza.raza@buildright.pk",
        phone: "03121456789",
        company: "BuildRight Constructions",
        status: "Lead",
        address: "Sector G-11, Islamabad",
        notes: "Looking for project management + invoicing combo.",
      },

      // ── Active (5) ─────────────────────────────────────────────────────────
      {
        name: "Fatima Noor",
        email: "fatima.noor@sparkdigital.pk",
        phone: "03002345678",
        company: "Spark Digital Agency",
        status: "Active",
        address: "2nd Floor, DHA Phase 4, Karachi",
        notes: "On premium plan since Jan 2025. Very satisfied.",
      },
      {
        name: "Ali Hassan",
        email: "ali.hassan@greenfield.com.pk",
        phone: "03218765432",
        company: "Greenfield Agri Ltd.",
        status: "Active",
        address: "Farm Road, Faisalabad",
        notes: "Uses inventory + CRM modules. Contract renewed April 2025.",
      },
      {
        name: "Zara Siddiqui",
        email: "zara.siddiqui@urbanfashion.pk",
        phone: "03340987654",
        company: "Urban Fashion Hub",
        status: "Active",
        address: "Shop 14, Fortress Stadium, Lahore",
        notes: "E-commerce integration active. Monthly sync call scheduled.",
      },
      {
        name: "Omar Farooq",
        email: "omar.farooq@alphafinance.pk",
        phone: "03441236789",
        company: "Alpha Finance Group",
        status: "Active",
        address: "Suite 201, I.I. Chundrigar Road, Karachi",
        notes: "High-value client. Dedicated account manager assigned.",
      },
      {
        name: "Nadia Hussain",
        email: "nadia.h@edubridge.pk",
        phone: "03119876543",
        company: "EduBridge Institute",
        status: "Active",
        address: "Block B, Model Town, Lahore",
        notes: "Student enrollment module live. Support ticket resolved.",
      },

      // ── Inactive (5) ──────────────────────────────────────────────────────
      {
        name: "Tariq Mehmood",
        email: "tariq.mehmood@oldtextiles.pk",
        phone: "03006543210",
        company: "Old City Textiles",
        status: "Inactive",
        address: "Cloth Market, Anarkali, Lahore",
        notes: "Contract ended Dec 2024. Did not renew due to budget cuts.",
      },
      {
        name: "Rabia Iqbal",
        email: "rabia.iqbal@sunrisebakery.pk",
        phone: "03215544332",
        company: "Sunrise Bakery",
        status: "Inactive",
        address: "Shop 3, Satellite Town, Rawalpindi",
        notes: "Small business, moved to a cheaper solution.",
      },
      {
        name: "Asad Khan",
        email: "asad.khan@peaklogistics.pk",
        phone: "03356677889",
        company: "Peak Logistics",
        status: "Inactive",
        address: "Sector I-9, Industrial Area, Islamabad",
        notes: "Paused subscription March 2025. May re-engage in Q3.",
      },
      {
        name: "Hina Baig",
        email: "hina.baig@silverlining.pk",
        phone: "03421098765",
        company: "Silver Lining Events",
        status: "Inactive",
        address: "F-7/2, Islamabad",
        notes: "Seasonal business. Will reach out in October.",
      },
      {
        name: "Imran Chaudhry",
        email: "imran.c@pioneertech.pk",
        phone: "03118889990",
        company: "Pioneer Tech Repairs",
        status: "Inactive",
        address: "Plaza 7, Saddar, Karachi",
        notes: "Churned after pricing change. Candidate for win-back campaign.",
      },
    ];

    await this.insertMany(sampleCustomers);
    console.log("🌱  Customer seed data inserted successfully (15 records).");
  } catch (err) {
    console.error("❌  Customer seed failed:", err.message);
  }
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
