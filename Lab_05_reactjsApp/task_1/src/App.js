import React from 'react';
import './App.css';

function StudentCard(props) {
  const cardStyle = {
    backgroundColor: props.color || '#1b263b', 
    padding: '25px',
    margin: '20px',
    borderRadius: '16px', 
    border: '1px solid #778da9', 
    boxShadow: '0 12px 24px rgba(13, 27, 42, 0.4)', 
    width: '320px',
    color: '#ffffff', 
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const headerStyle = {
    borderBottom: '1px solid #e0e1dd', 
    paddingBottom: '12px',
    marginBottom: '15px',
    marginTop: '0',
    fontWeight: '600'
  };

  return (
    <div style={cardStyle}>
      <h2 style={headerStyle}>Name: {props.name}</h2>
      <p><strong>Roll No:</strong> {props.rollNo}</p>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>University:</strong> {props.university}</p>
    </div>
  );
}

function App() {
  const appStyle = {
    backgroundColor: '#e0e1dd', 
    minHeight: '100vh',
    padding: '50px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#1a1a1a' 
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: '100%',
    marginTop: '20px'
  };

  return (
    <div style={appStyle}>
      <h1 style={{ marginBottom: '20px', borderBottom: '2px solid #415a77', paddingBottom: '15px' }}>
        Student Information System
      </h1>
      
      <div style={containerStyle}>
        <StudentCard 
          name="Musab Ejaz" 
          rollNo="232066" 
          department="Software Engineering" 
          university="Air University" 
          color="#1b263b" 
        />
          
        <StudentCard 
          name="Hassan Raza" 
          rollNo="231976" 
          department="Computer Science" 
          university="Air University" 
          color="#415a77" 
        />
        
        <StudentCard 
          name="Tayyab Janjua" 
          rollNo="231736" 
          department="Artificial Intelligence" 
          university="Air University" 
          color="#778da9" 
        />
      </div>
    </div>
  );
}

export default App;