import React, { useState, useEffect } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { apiClient } from '../utils/apiClient';

function FraudCasesPage() {
  const [fraudCases, setFraudCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFraudCases = async () => {
      try {
        const data = await apiClient.getFraudCases();
        if (Array.isArray(data)) {
          setFraudCases(data);
        } else {
          // Default data if API returns empty
          setFraudCases([
            { _id: '1', caseId: 'DOC-2024-001', university: 'Medtech', fraudType: 'Logo', severity: 'high', detectedDate: '2024-12-01' },
            { _id: '2', caseId: 'DOC-2024-002', university: 'Esprit', fraudType: 'Font', severity: 'medium', detectedDate: '2024-12-03' },
            { _id: '3', caseId: 'DOC-2024-003', university: 'INSAT', fraudType: 'Stamp', severity: 'high', detectedDate: '2024-12-05' },
            { _id: '4', caseId: 'DOC-2024-004', university: 'Medtech', fraudType: 'Layout', severity: 'low', detectedDate: '2024-12-07' },
            { _id: '5', caseId: 'DOC-2024-005', university: 'ENIT', fraudType: 'Logo', severity: 'high', detectedDate: '2024-12-10' },
            { _id: '6', caseId: 'DOC-2024-006', university: 'INSAT', fraudType: 'Font', severity: 'medium', detectedDate: '2024-12-12' },
            { _id: '7', caseId: 'DOC-2024-007', university: 'Esprit', fraudType: 'Stamp', severity: 'high', detectedDate: '2024-12-14' },
            { _id: '8', caseId: 'DOC-2024-008', university: 'MSE', fraudType: 'Layout', severity: 'medium', detectedDate: '2024-12-16' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching fraud cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFraudCases();
  }, []);

  const typeCounts = fraudCases.reduce((acc, c) => {
    acc[c.fraudType] = (acc[c.fraudType] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <AlertTriangle size={28} color="#ef4444" />
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '4px' }}>Fraud Cases</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>View and manage detected fraud cases</p>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#94a3b8' }}>
          Total Cases: <span style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>{fraudCases.length}</span>
        </div>
      </div>

      {loading ? (
        <div style={{ color: '#fff', fontSize: '18px' }}>Loading fraud cases...</div>
      ) : (
      <>
      {/* Type Filter Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
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

      <input
        type="text"
        placeholder="Search..."
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
            {fraudCases.map((fraudCase, idx) => {
              const typeColors = {
                Logo: '#3b82f6',
                Font: '#14b8a6',
                Stamp: '#f59e0b',
                Layout: '#ec4899'
              };
              const color = typeColors[fraudCase.fraudType];
              const severityEmojis = {
                low: '🟢',
                medium: '🟡',
                high: '🔴'
              };
              
              return (
                <tr key={fraudCase._id || idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '20px 24px', color: '#fff', fontSize: '14px', fontFamily: 'monospace', fontWeight: '600' }}>
                    {fraudCase.caseId}
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
                      {fraudCase.fraudType}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      background: fraudCase.severity === 'high' ? 'rgba(239, 68, 68, 0.15)' : fraudCase.severity === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                      color: fraudCase.severity === 'high' ? '#ef4444' : fraudCase.severity === 'medium' ? '#f59e0b' : '#22c55e',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'capitalize'
                    }}>
                      {severityEmojis[fraudCase.severity]} {fraudCase.severity}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>
                    {new Date(fraudCase.detectedDate).toLocaleDateString()}
                  </td>
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
      </>
      )}
    </div>
  );
}

export default FraudCasesPage;
