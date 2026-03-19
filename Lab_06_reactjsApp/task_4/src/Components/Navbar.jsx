import React from 'react';
import { Link } from 'react-router-dom';

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

export default Navbar;