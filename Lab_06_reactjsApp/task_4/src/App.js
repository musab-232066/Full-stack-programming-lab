import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/products" className="nav-link">Products</Link>
      <Link to="/contact" className="nav-link">Contact Us</Link>
    </nav>
  );
}

function Home() {
  return (
    <div className="page-container">
      <h2>Welcome to Our Store</h2>
      <p>Discover the best products crafted with care and quality. Navigate through our website to learn more about our mission and offerings.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page-container">
      <h2>About Us</h2>
      <p>We are a dedicated team providing top-tier services and products. Our website is built using modern web technologies like React and React Router to ensure a seamless user experience.</p>
    </div>
  );
}

function Products() {
  return (
    <div className="page-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        <div className="product-card">
          <h3>Vintage Watch</h3>
          <p>A classic timepiece with modern internals.</p>
          <button className="btn">Add to Cart</button>
        </div>
        <div className="product-card">
          <h3>Leather Bag</h3>
          <p>Handcrafted premium leather daily carrier.</p>
          <button className="btn">Add to Cart</button>
        </div>
        <div className="product-card">
          <h3>Smart Glasses</h3>
          <p>Next-generation augmented reality frames.</p>
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" className="form-input" placeholder="Your Name" required />
        <input type="email" className="form-input" placeholder="Your Email" required />
        <textarea className="form-input" placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" className="btn">Send Message</button>
      </form>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page-container">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>
        Return Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;