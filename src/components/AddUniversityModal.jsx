import React, { useState } from 'react';
import { X } from 'lucide-react';

function AddUniversityModal({ isOpen, onClose, onAdd, editingUniversity }) {
  const [formData, setFormData] = useState(
    editingUniversity || {
      name: '',
      country: 'Tunisia',
      email: '',
      status: 'active'
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    onAdd(formData);
    setFormData({
      name: '',
      country: 'Tunisia',
      email: '',
      status: 'active'
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '32px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#fff',
            margin: 0
          }}>
            {editingUniversity ? 'Edit University' : 'Add New University'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* University Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#cbd5e1',
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              University Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Medtech"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            />
          </div>

          {/* Country */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#cbd5e1',
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <option value="Tunisia" style={{ background: '#1e293b', color: '#fff' }}>Tunisia</option>
              <option value="Algeria" style={{ background: '#1e293b', color: '#fff' }}>Algeria</option>
              <option value="Morocco" style={{ background: '#1e293b', color: '#fff' }}>Morocco</option>
              <option value="Libya" style={{ background: '#1e293b', color: '#fff' }}>Libya</option>
              <option value="Egypt" style={{ background: '#1e293b', color: '#fff' }}>Egypt</option>
            </select>
          </div>

          {/* Email Domain */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#cbd5e1',
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Email Domain *
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                color: '#94a3b8',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                @
              </span>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., medtech.tn"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              />
            </div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#cbd5e1',
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <option value="active" style={{ background: '#1e293b', color: '#fff' }}>Active</option>
              <option value="inactive" style={{ background: '#1e293b', color: '#fff' }}>Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#cbd5e1',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              {editingUniversity ? 'Update' : 'Add'} University
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUniversityModal;
