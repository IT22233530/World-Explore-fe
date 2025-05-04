// Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <nav 
      className="bg-[#222831] shadow-xl text-[#EEEEEE] fixed top-0 w-full z-50"
      aria-label="Main navigation"
      style={{
        borderBottom: '1px solid rgba(0, 173, 181, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              to="/home" 
              className="flex items-center space-x-2 group"
              aria-label="Go to homepage"
            >
              <svg 
                className="h-8 w-8 text-[#00ADB5] transition-all duration-300 group-hover:text-[#EEEEEE] group-hover:scale-110" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2.991M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h1 className="text-xl font-bold tracking-wide group-hover:text-[#00ADB5] transition-colors duration-300">
                Country Explorer
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3" ref={profileRef}>
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-[#393E46] hover:bg-[#2C3039] focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                style={{
                  boxShadow: isProfileOpen ? '0 0 0 2px #00ADB5' : 'none'
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#00ADB5] flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                  <span className="text-lg text-[#222831]">{(user?.name?.[0] || 'U').toUpperCase()}</span>
                </div>
                <span className="hidden sm:inline">{user?.name || 'User'}</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${isProfileOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Profile Dropdown with Animation */}
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-[#393E46] rounded-md shadow-2xl py-1 z-10 transform origin-top-right animate-dropdown"
                  role="menu"
                  aria-orientation="vertical"
                  style={{
                    border: '1px solid rgba(0, 173, 181, 0.3)',
                    animation: 'dropdownFade 0.3s ease-out forwards',
                  }}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-[#EEEEEE] hover:bg-[#2C3039] hover:text-[#00ADB5] transition-colors duration-200"
                    role="menuitem"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-[#EEEEEE] hover:bg-[#2C3039] hover:text-[#00ADB5] transition-colors duration-200"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#00ADB5] hover:bg-[#2C3039] hover:text-[#EEEEEE] transition-colors duration-200"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-[#00ADB5] hover:text-[#EEEEEE] hover:bg-[#393E46] focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open main menu"
            >
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu with Animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        ref={menuRef}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#393E46]">
          <Link
            to="/favorites"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EEEEEE] hover:bg-[#2C3039] hover:text-[#00ADB5] transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EEEEEE] hover:bg-[#2C3039] hover:text-[#00ADB5] transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>

      {/* Custom NavLink Component */}
      <style jsx>{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

// Custom NavLink component with hover effects
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative px-3 py-2 rounded-md text-sm font-medium text-[#EEEEEE] hover:text-[#00ADB5] transition-colors duration-300 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ADB5] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

export default Navbar;