import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    // Check if we're in development mode with auth bypass
    const isDevelopment = process.env.NODE_ENV === 'development';
    const bypassAuth = process.env.REACT_APP_BYPASS_AUTH === 'true';
    
    if (isDevelopment && bypassAuth) {
      console.log('⚠️ Authentication bypassed in development mode');
      // Create a mock user
      const mockUser = {
        _id: '60d0fe4f5311236168a109ca',
        name: 'Development User',
        email: 'dev@example.com',
        token: 'mock_token_for_development'
      };
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      navigate('/dashboard');
      return;
    }

    try {
      setLoading(true);
      // Use the full URL for the API call
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:53585/api'}/auth/login`;
      console.log('Login API URL:', apiUrl);
      
      const { data } = await axios.post(apiUrl, { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="py-3">
        <p>
          New to PhotoPilot? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;