import React from 'react';

function Header({ setShowUserMenu, showUserMenu, setCurrentPage }) {
  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0', fontWeight: '500' }}>
          Academic Document Authentication System
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#ef4444',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          9
        </div>
        <div style={{ position: 'relative' }} data-user-menu>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            B
          </button>
          
          {/* Dropdown Menu */}
          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '0',
              width: '280px',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              overflow: 'hidden',
              zIndex: 1000,
              animation: 'slideDown 0.2s ease'
            }}>
              {/* User Info Header */}
              <div style={{
                padding: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  B
                </div>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#fff',
                    marginBottom: '2px'
                  }}>
                    Barboucheyassmine2506
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    fontWeight: '500'
                  }}>
                    admin
                  </div>
                </div>
              </div>

              {/* Menu Section */}
              <div style={{ padding: '12px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '8px 12px',
                  marginBottom: '4px'
                }}>
                  My Account
                </div>

                {/* Profile Button */}
                <button
                  onClick={() => {
                    setCurrentPage('profile');
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    alert('Logging out...');
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#ef4444',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
