import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if we're in development mode with auth bypass
  const isDevelopment = process.env.NODE_ENV === 'development';
  const bypassAuth = process.env.REACT_APP_BYPASS_AUTH === 'true';
  
  if (isDevelopment && bypassAuth) {
    console.log('⚠️ Authentication bypassed in development mode');
    // If no user info exists, create a mock user
    if (!localStorage.getItem('userInfo')) {
      const mockUser = {
        _id: '60d0fe4f5311236168a109ca',
        name: 'Development User',
        email: 'dev@example.com',
        token: 'mock_token_for_development'
      };
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
    }
    return children;
  }
  
  // Normal authentication check
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  return userInfo ? children : <Navigate to="/login" />;
};

export default PrivateRoute;