import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-wrapper">
      <div className="counter-card">
        <h2 className="counter-title">Interactive Counter</h2>
        
        <div className="counter-display">
          {count}
        </div>
        
        <div className="button-container">
          <button 
            className="counter-btn btn-increment" 
            onClick={handleIncrement}
          >
            Increment
          </button>
          
          <button 
            className="counter-btn btn-decrement" 
            onClick={handleDecrement}
            disabled={count === 0}
          >
            Decrement
          </button>
          
          <button 
            className="counter-btn btn-reset" 
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;