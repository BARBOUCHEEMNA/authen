import React, { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';

function FraudCasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const fraudCases = [
    { id: 'DOC-2024-001', university: 'Medtech', type: 'Logo', confidence: 94.5, date: '2024-12-01' },
    { id: 'DOC-2024-002', university: 'Esprit', type: 'Font', confidence: 87.2, date: '2024-12-03' },
    { id: 'DOC-2024-003', university: 'INSAT', type: 'Stamp', confidence: 91.8, date: '2024-12-05' },
    { id: 'DOC-2024-004', university: 'Medtech', type: 'Layout', confidence: 78.3, date: '2024-12-07' },
    { id: 'DOC-2024-005', university: 'ENIT', type: 'Logo', confidence: 96.1, date: '2024-12-10' },
    { id: 'DOC-2024-006', university: 'INSAT', type: 'Font', confidence: 89.4, date: '2024-12-12' },
    { id: 'DOC-2024-007', university: 'Esprit', type: 'Stamp', confidence: 92.7, date: '2024-12-14' },
    { id: 'DOC-2024-008', university: 'MSE', type: 'Layout', confidence: 85.6, date: '2024-12-16' }
  ];

  const filteredFraudCases = searchTerm
    ? fraudCases.filter(fraudCase =>
        fraudCase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fraudCase.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fraudCase.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : fraudCases;

  const typeCounts = {
    Logo: 3,
    Font: 3,
    Stamp: 2,
    Layout: 2
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <AlertTriangle size={28} color="#ef4444" />
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '4px' }}>Fraud Cases</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>View and manage detected fraud cases</p>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#94a3b8' }}>
          Total Cases: <span style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>10</span>
        </div>
      </div>

      {/* Type Filter Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {Object.entries(typeCounts).map(([type, count]) => {
          const colors = {
            Logo: '#3b82f6',
            Font: '#14b8a6',
            Stamp: '#f59e0b',
            Layout: '#ec4899'
          };
          return (
            <div key={type} style={{
              background: `${colors[type]}10`,
              border: `1px solid ${colors[type]}30`,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                background: colors[type],
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block',
                marginBottom: '12px'
              }}>
                {type}
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>{count}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>cases detected</div>
            </div>
          );
        })}
      </div>

      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search fraud cases by ID, university, or type...' />

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
              {['Document ID', 'University', 'Detection Type', 'Confidence Score', 'Date Detected', 'Actions'].map((header) => (
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
            {filteredFraudCases.map((fraudCase, idx) => {
              const typeColors = {
                Logo: '#3b82f6',
                Font: '#14b8a6',
                Stamp: '#f59e0b',
                Layout: '#ec4899'
              };
              const color = typeColors[fraudCase.type];
              
              return (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '20px 24px', color: '#fff', fontSize: '14px', fontFamily: 'monospace', fontWeight: '600' }}>
                    {fraudCase.id}
                  </td>
                  <td style={{ padding: '20px 24px', color: '#cbd5e1', fontSize: '14px' }}>{fraudCase.university}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      background: `${color}15`,
                      color: color,
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {fraudCase.type}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '100px',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${fraudCase.confidence}%`,
                          height: '100%',
                          background: fraudCase.confidence > 90 ? '#ef4444' : fraudCase.confidence > 85 ? '#f59e0b' : '#94a3b8',
                          borderRadius: '4px'
                        }} />
                      </div>
                      <span style={{
                        background: fraudCase.confidence > 90 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: fraudCase.confidence > 90 ? '#ef4444' : '#f59e0b',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {fraudCase.confidence}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>{fraudCase.date}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '4px'
                    }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FraudCasesPage;
