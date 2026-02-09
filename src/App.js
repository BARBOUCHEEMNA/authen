import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

// Layout Components
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UniversitiesPage from './pages/UniversitiesPage';
import TemplatesPage from './pages/TemplatesPage';
import FraudCasesPage from './pages/FraudCasesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import EstimationPage from './pages/EstimationPage';

// Main App Component
export default function AuthentiQaApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('[data-user-menu]')) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('dashboard');
    setShowUserMenu(false);
  };

  // Conditional rendering based on login status
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div style={{ fontFamily: '"Spline Sans", "Outfit", sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main style={{ marginLeft: '240px', minHeight: '100vh' }}>
        <Header
          setShowUserMenu={setShowUserMenu}
          showUserMenu={showUserMenu}
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <div style={{ padding: '40px' }}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'universities' && <UniversitiesPage />}
          {currentPage === 'templates' && <TemplatesPage />}
          {currentPage === 'fraud-cases' && <FraudCasesPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'estimation' && <EstimationPage />}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
