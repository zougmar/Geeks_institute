import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import EmployerDashboard from './pages/employer/Dashboard';
import EmployerManagers from './pages/employer/Managers';
import EmployerLeads from './pages/employer/Leads';
import ManagerLeads from './pages/manager/Leads';

function Protected({ role, children }) {
  const { user, loading } = useContext(AuthContext);
  if(loading) return <div>Loading...</div>;
  if(!user) return <Navigate to="/login" replace />;
  if(role && user.role !== role) return <div>Forbidden</div>;
  return children;
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/employer/dashboard" element={<Protected role="employer"><EmployerDashboard/></Protected>} />
          <Route path="/employer/managers" element={<Protected role="employer"><EmployerManagers/></Protected>} />
          <Route path="/employer/leads" element={<Protected role="employer"><EmployerLeads/></Protected>} />
          <Route path="/manager/leads" element={<Protected role="manager"><ManagerLeads/></Protected>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
