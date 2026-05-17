const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  { name: 'Wooden Bed Frame', price: 134.99, category: 'beds', type: 'featured', description: 'Handcrafted reclaimed wood bed frame.', image: '/images/bed1.jpg' },
  { name: 'Oak Cabinet', price: 134.99, category: 'cabinets', type: 'special', description: 'Solid oak storage cabinet.', image: '/images/cabinet1.jpg' },
  { name: 'Rustic Chair', price: 134.99, category: 'chairs', type: 'popular', description: 'Hand-crafted wooden armchair.', image: '/images/chair1.jpg', onSale: true, salePercent: 35 },
  { name: 'Pine Bookcase', price: 134.99, category: 'bookcases', type: 'featured', description: 'Five-shelf pine bookcase.', image: '/images/bookcase1.jpg' },
  { name: 'Reclaimed Table', price: 134.99, category: 'tables', type: 'popular', description: 'Reclaimed and hand-crafted dining table.', image: '/images/table1.jpg', onSale: true, salePercent: 50 },
  { name: 'Storage Box', price: 134.99, category: 'boxes', type: 'special', description: 'Decorative wooden storage box.', image: '/images/box1.jpg' },
  { name: 'Elite Chair', price: 134.99, category: 'chairs', type: 'featured', description: 'Premium hand-crafted elite chair.', image: '/images/chair2.jpg' },
  { name: 'Carved Cabinet', price: 134.99, category: 'cabinets', type: 'popular', description: 'Hand-carved antique cabinet.', image: '/images/cabinet2.jpg' },
  { name: 'Twin Bed', price: 134.99, category: 'beds', type: 'special', description: 'Classic twin wooden bed.', image: '/images/bed2.jpg' },
  { name: 'Walnut Hat Stand', price: 134.99, category: 'tables', type: 'featured', description: 'Decorative walnut hat stand.', image: '/images/stand1.jpg', onSale: true, salePercent: 20 },
  { name: 'Reading Chair', price: 129.99, category: 'chairs', type: 'popular', description: 'Comfortable wooden reading chair.', image: '/images/chair3.jpg' },
  { name: 'Display Shelf', price: 134.99, category: 'bookcases', type: 'special', description: 'Open display shelf unit.', image: '/images/shelf1.jpg' },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded!');
  process.exit();
});