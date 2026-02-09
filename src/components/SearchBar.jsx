import React from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ value, onChange, placeholder = 'Search...', maxWidth = '400px' }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: maxWidth, marginBottom: '24px' }}>
      <div style={{ position: 'relative' }}>
        <Search size={18} style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#94a3b8',
          pointerEvents: 'none'
        }} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '14px 20px 14px 46px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}
        />
        {value && (
          <button
            onClick={() => onChange({ target: { value: '' } })}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#cbd5e1'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
