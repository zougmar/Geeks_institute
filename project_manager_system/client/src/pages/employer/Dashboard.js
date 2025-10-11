// client/src/pages/employer/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function EmployerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.dashboardStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employer Dashboard</h1>

      {/* Navigation */}
      <nav className="mb-8">
        <Link
          to="/employer/managers"
          className="px-4 py-2 mr-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Managers
        </Link>
        <Link
          to="/employer/leads"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Leads
        </Link>
      </nav>

      {/* Stats */}
      {!stats ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Leads In Progress</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Leads Completed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Leads Canceled</h3>
            <p className="text-3xl font-bold text-red-600">{stats.canceled}</p>
          </div>
        </div>
      )}
    </div>
  );
}
