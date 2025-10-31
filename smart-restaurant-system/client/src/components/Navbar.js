import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get navigation items based on user role
  const getNavItems = () => {
    const items = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/order', label: 'New Order' }
    ];

    if (user?.role === 'kitchen') {
      items.push({ path: '/kitchen', label: 'Kitchen View' });
    }

    if (user?.role === 'admin') {
      items.push({ path: '/menu-management', label: 'Menu Management' });
    }

    return items;
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="text-white font-bold text-xl">
                Smart Restaurant
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'border-white text-white'
                      : 'border-transparent text-indigo-200 hover:border-white hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <div className="relative">
                <div className="flex items-center text-white text-sm">
                  <span className="mr-2">Welcome, {user?.username}</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-800">
                    {user?.role}
                  </span>
                </div>
              </div>
              <div className="ml-3 relative">
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 p-1 rounded-full text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="sr-only">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
