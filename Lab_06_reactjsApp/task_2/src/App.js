import React, { useState } from 'react';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">User Registration</h2>
        
        <form onSubmit={handleSubmit} className="user-form">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        {submittedData && (
          <div className="submitted-info">
            <h3>Successfully Submitted!</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;