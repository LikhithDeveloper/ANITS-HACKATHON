import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, FileText, User, LogOut, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Mock auth state for UI demo
  const isLoggedIn = false; 

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Brain className="logo-icon" size={32} />
          <span className="logo-text">TalentScout<span className="logo-accent">AI</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links desktop-menu">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={18} /> Home
          </Link>
          <Link to="/resume-screening" className={`nav-link ${location.pathname === '/resume-screening' ? 'active' : ''}`}>
            <FileText size={18} /> Resume Screening
          </Link>
          
          <div className="nav-divider"></div>

          {isLoggedIn ? (
            <button className="btn btn-outline nav-btn">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary nav-btn">
              <User size={18} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
          <Link to="/resume-screening" className="mobile-link" onClick={toggleMenu}>Resume Screening</Link>
          {isLoggedIn ? (
            <button className="mobile-link" onClick={toggleMenu}>Logout</button>
          ) : (
            <Link to="/login" className="mobile-link" onClick={toggleMenu}>Login</Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
