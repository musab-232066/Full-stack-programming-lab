import React from 'react';
import { Link } from 'react-router-dom';

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

export default NotFound;