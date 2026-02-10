import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { apiClient } from '../utils/apiClient';

function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await apiClient.getUniversities();
        if (Array.isArray(data)) {
          setUniversities(data);
        } else {
          // Default data if API returns empty
          setUniversities([
            { _id: '1', name: 'Medtech', location: 'Tunisia', documentsAnalyzed: 2500, fraudsDetected: 85, status: 'active' },
            { _id: '2', name: 'Esprit', location: 'Tunisia', documentsAnalyzed: 1800, fraudsDetected: 62, status: 'active' },
            { _id: '3', name: 'INSAT', location: 'Tunisia', documentsAnalyzed: 2200, fraudsDetected: 75, status: 'active' },
            { _id: '4', name: 'ENIT', location: 'Tunisia', documentsAnalyzed: 1950, fraudsDetected: 68, status: 'active' },
            { _id: '5', name: 'MSE', location: 'Tunisia', documentsAnalyzed: 1600, fraudsDetected: 55, status: 'active' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Universities</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Manage partner universities and their settings</p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
        }}>
          <Plus size={18} />
          Add University
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '14px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '14px',
          marginBottom: '24px',
          outline: 'none'
        }}
      />

      {loading ? (
        <div style={{ color: '#fff', fontSize: '18px' }}>Loading universities...</div>
      ) : (
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              {['University Name', 'Location', 'Documents', 'Frauds Detected', 'Status', 'Actions'].map((header) => (
                <th key={header} style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUniversities.map((uni, idx) => (
              <tr key={uni._id || idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px 24px', color: '#fff', fontSize: '14px', fontWeight: '500' }}>{uni.name}</td>
                <td style={{ padding: '20px 24px', color: '#cbd5e1', fontSize: '14px' }}>{uni.location}</td>
                <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>{uni.documentsAnalyzed?.toLocaleString() || 0}</td>
                <td style={{ padding: '20px 24px', color: '#ef5350', fontSize: '14px', fontWeight: '600' }}>{uni.fraudsDetected || 0}</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{
                    background: uni.status === 'active' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: uni.status === 'active' ? '#3b82f6' : '#ef4444',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {uni.status}
                  </span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      padding: '4px'
                    }}>
                      <Edit size={18} />
                    </button>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '4px'
                    }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

export default UniversitiesPage;
