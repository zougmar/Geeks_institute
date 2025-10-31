import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import KitchenView from './components/KitchenView';
import MenuManagement from './components/MenuManagement';
import OrderForm from './components/OrderForm';
import Navbar from './components/Navbar';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Styles
import './index.css';

// Initialize socket
const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// App content component
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kitchen"
          element={
            <ProtectedRoute requiredRole="kitchen">
              <KitchenView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu-management"
          element={
            <ProtectedRoute requiredRole="admin">
              <MenuManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <SocketProvider socket={socket}>
        <AppContent />
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
