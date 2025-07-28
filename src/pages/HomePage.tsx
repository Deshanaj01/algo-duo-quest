import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a2e', 
      color: 'white', 
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        textAlign: 'center',
        marginBottom: '40px',
        color: '#00ff88'
      }}>
        🚀 Algo Duo Quest
      </h1>
      
      <div style={{ 
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Learn Data Structures and Algorithms with interactive lessons!
        </p>
        
        <Link 
          to="/arrays" 
          style={{ 
            display: 'inline-block',
            backgroundColor: '#6c5ce7',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          📚 Start with Arrays
        </Link>
      </div>
      
      <div style={{
        backgroundColor: '#2d3436',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#74b9ff', marginBottom: '20px' }}>Available Topics</h2>
        
        <div style={{
          display: 'grid',
          gap: '15px'
        }}>
          <Link 
            to="/arrays" 
            style={{
              display: 'block',
              backgroundColor: '#636e72',
              padding: '20px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              border: '2px solid #00b894'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>📊 Arrays</h3>
            <p style={{ margin: 0, color: '#ddd' }}>
              Learn the fundamentals of arrays with interactive visualizations
            </p>
          </Link>
          
          <div style={{
            backgroundColor: '#636e72',
            padding: '20px',
            borderRadius: '8px',
            opacity: 0.6
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🔗 Linked Lists (Coming Soon)</h3>
            <p style={{ margin: 0, color: '#ddd' }}>
              Master dynamic data structures and pointer manipulation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
