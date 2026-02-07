import React from 'react';
import { LayoutDashboard, GraduationCap, FileText, AlertTriangle, BarChart3, Settings, Shield } from 'lucide-react';

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '240px',
      background: 'linear-gradient(180deg, #0a0f1e 0%, #121824 100%)',
      borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={32} color="#3b82f6" strokeWidth={2.5} />
          <span style={{ fontSize: '24px', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>Authentiqa</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '24px 12px' }}>
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'universities', icon: GraduationCap, label: 'Universities' },
          { id: 'templates', icon: FileText, label: 'Templates' },
          { id: 'fraud-cases', icon: AlertTriangle, label: 'Fraud Cases' },
          { id: 'analytics', icon: BarChart3, label: 'Analytics' },
          { id: 'estimation', icon: Settings, label: 'Estimation' }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                marginBottom: '4px',
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: isActive ? '#3b82f6' : '#94a3b8',
                fontSize: '15px',
                fontWeight: isActive ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.color = '#cbd5e1';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '11px',
        color: '#64748b',
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: '0.05em'
      }}>
        Document Authentication<br />
        AI-Powered Fraud Detection
      </div>
    </aside>
  );
}

export default Sidebar;
