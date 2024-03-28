import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  // Replace isAuthenticated with your own authentication logic
  const isAuthenticated = true; // Example: Set to true if user is authenticated

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/login" replace state={{ from: rest.location }} />
        )
      }
    />
  );
};
export default ProtectedRoute;