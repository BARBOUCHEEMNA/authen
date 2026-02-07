import React from 'react';

function StatCard({ title, value, subtitle, change, color, icon }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        fontSize: '80px',
        opacity: 0.1
      }}>
        {icon}
      </div>
      <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </div>
      <div style={{ fontSize: '36px', fontWeight: '700', color: '#fff', marginBottom: '4px', letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
        {subtitle}
      </div>
      {change && (
        <div style={{
          fontSize: '12px',
          color: color,
          fontWeight: '600',
          display: 'inline-block',
          background: `${color}15`,
          padding: '4px 10px',
          borderRadius: '6px'
        }}>
          {change}
        </div>
      )}
    </div>
  );
}

export default StatCard;
