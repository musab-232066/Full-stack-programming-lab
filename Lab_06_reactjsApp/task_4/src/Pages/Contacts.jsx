import React from 'react';

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

export default Contact;