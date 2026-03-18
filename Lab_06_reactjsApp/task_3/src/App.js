import React, { useState } from 'react';
import './Actions.css';

function Actions() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#eaf0ce');
  const [titleColor, setTitleColor] = useState('#3f334d');

  const handleShowMessage = () => {
    setMessage('Hello! The onClick event triggered this message.');
  };

  const handleChangeBackground = () => {
    setBgColor((prevColor) => (prevColor === '#eaf0ce' ? '#c0c5c1' : '#eaf0ce'));
  };

  const handleShowAlert = () => {
    alert('This is a browser alert triggered by React!');
  };

  const handleMouseOver = () => {
    setTitleColor('#7d8491');
  };

  const handleMouseOut = () => {
    setTitleColor('#3f334d');
  };

  return (
    <div className="actions-wrapper" style={{ backgroundColor: bgColor }}>
      <div className="actions-card">
        <h2 
          className="title-text"
          style={{ color: titleColor }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Interactive Event Handlers
        </h2>
        
        {message && <div className="message-display">{message}</div>}

        <div className="button-group">
          <button className="action-btn btn-msg" onClick={handleShowMessage}>
            Show Message
          </button>
          
          <button className="action-btn btn-bg" onClick={handleChangeBackground}>
            Change Background
          </button>
          
          <button className="action-btn btn-alert" onClick={handleShowAlert}>
            Show Alert
          </button>
        </div>
      </div>
    </div>
  );
}

export default Actions;