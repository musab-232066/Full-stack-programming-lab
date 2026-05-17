const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['beds', 'cabinets', 'bookcases', 'boxes', 'chairs', 'tables'],
      required: true,
    },
    type: {
      type: String,
      enum: ['featured', 'special', 'popular'],
      default: 'featured',
    },
    image: { type: String },
    onSale: { type: Boolean, default: false },
    salePercent: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
