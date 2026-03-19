import React from 'react';

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

export default Products;