import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const NavbarNew = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-teal-900">Digitancy</Link>
                </div>

                {isHomePage && (
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-pink-700 transition">Fonctionnalités</a>
                        <a href="#testimonials" className="text-gray-700 hover:text-pink-700 transition">Témoignages</a>
                        <a href="#pricing" className="text-gray-700 hover:text-pink-700 transition">Tarifs</a>
                        <Link to="/dashboard" className="text-gray-700 hover:text-pink-700 transition">Ressources</Link>
                    </div>
                )}

                <div className="flex items-center space-x-4">
                    {location.pathname !== '/login' && (
                        <button 
                            onClick={() => navigate('/login')} 
                            className="text-gray-700 hover:text-pink-700 transition font-medium"
                        >
                            Connexion
                        </button>
                    )}
                    <button 
                        onClick={() => navigate('/assessment')} 
                        className="bg-pink-700 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition"
                    >
                        Essai gratuit
                    </button>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-gray-700 hover:text-pink-700 transition focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>
        </header>
    );
};

export default NavbarNew;
