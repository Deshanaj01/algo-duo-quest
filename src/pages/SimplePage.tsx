import React from 'react';
import { Link } from 'react-router-dom';

interface SimplePageProps {
  title: string;
  emoji: string;
  description: string;
}

const SimplePage: React.FC<SimplePageProps> = ({ title, emoji, description }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a2e', 
      color: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <nav style={{ marginBottom: '30px' }}>
        <Link to="/" style={{ color: '#74b9ff', textDecoration: 'none', fontSize: '18px' }}>
          ← Back to Home
        </Link>
      </nav>
      
      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          {emoji} {title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#b2bec3', marginBottom: '30px' }}>
          {description}
        </p>
        <div style={{ 
          backgroundColor: '#2d3436', 
          padding: '30px', 
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ color: '#00b894', marginBottom: '20px' }}>🚧 Under Development</h2>
          <p style={{ color: '#ddd', lineHeight: '1.6' }}>
            This feature is coming soon! We're working hard to bring you the best learning experience.
          </p>
          <div style={{ marginTop: '30px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{ 
                background: 'linear-gradient(45deg, #6c5ce7, #74b9ff)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                🏠 Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePage;
