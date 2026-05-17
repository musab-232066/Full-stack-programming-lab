const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Wooden Bed Frame', price: 134.99, category: 'beds', type: 'featured',
    description: 'Handcrafted reclaimed wood bed frame.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=200&h=200&fit=crop'
  },
  {
    name: 'Oak Cabinet', price: 134.99, category: 'cabinets', type: 'special',
    description: 'Solid oak storage cabinet.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop'
  },
  {
    name: 'Rustic Chair', price: 134.99, category: 'chairs', type: 'popular',
    description: 'Hand-crafted wooden armchair.', onSale: true, salePercent: 35,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop'
  },
  {
    name: 'Pine Bookcase', price: 134.99, category: 'bookcases', type: 'featured',
    description: 'Five-shelf pine bookcase.',
    image: 'https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=200&h=200&fit=crop'
  },
  {
    name: 'Reclaimed Table', price: 134.99, category: 'tables', type: 'popular',
    description: 'Reclaimed and hand-crafted dining table.', onSale: true, salePercent: 50,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&h=200&fit=crop'
  },
  {
    name: 'Storage Box', price: 134.99, category: 'boxes', type: 'special',
    description: 'Decorative wooden storage box.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop'
  },
  {
    name: 'Elite Chair', price: 134.99, category: 'chairs', type: 'featured',
    description: 'Premium hand-crafted elite chair.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200&h=200&fit=crop'
  },
  {
    name: 'Carved Cabinet', price: 134.99, category: 'cabinets', type: 'popular',
    description: 'Hand-carved antique cabinet.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=200&h=200&fit=crop'
  },
  {
    name: 'Twin Bed', price: 134.99, category: 'beds', type: 'special',
    description: 'Classic twin wooden bed.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop'
  },
  {
    name: 'Walnut Hat Stand', price: 134.99, category: 'tables', type: 'featured',
    description: 'Decorative walnut hat stand.', onSale: true, salePercent: 20,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop'
  },
  {
    name: 'Reading Chair', price: 129.99, category: 'chairs', type: 'popular',
    description: 'Comfortable wooden reading chair.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop'
  },
  {
    name: 'Display Shelf', price: 134.99, category: 'bookcases', type: 'special',
    description: 'Open display shelf unit.',
    image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=200&h=200&fit=crop'
  },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Database seeded with images!');
  process.exit();
});