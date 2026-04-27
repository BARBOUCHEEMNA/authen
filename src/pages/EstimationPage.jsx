import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { apiClient } from '../utils/apiClient';

function EstimationPage() {
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzedDocuments, setAnalyzedDocuments] = useState(1000);
  const [detectedAnomalies, setDetectedAnomalies] = useState(35);
  const [estimationResult, setEstimationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      setError('');

      try {
        const dashboardStats = await apiClient.getDashboardStats();
        setStats(dashboardStats || null);
        
        // Pre-populate with backend data if available
        if (dashboardStats?.total_documents) {
          setAnalyzedDocuments(Number(dashboardStats.total_documents));
        }
        if (dashboardStats?.frauds_detected != null) {
          setDetectedAnomalies(Number(dashboardStats.frauds_detected));
        }
      } catch (err) {
        console.error('Error loading stats:', err);
        setError('Unable to load backend data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const calculateEstimation = () => {
    if (analyzedDocuments <= 0) {
      alert('Number of analyzed documents must be greater than 0');
      return;
    }

    const forgeryRate = (detectedAnomalies / analyzedDocuments) * 100;
    const confidenceLevel = Math.max(0, 100 - (Math.abs(detectedAnomalies - analyzedDocuments * 0.03) / (analyzedDocuments * 0.05)) * 10);

    setEstimationResult({
      forgeryRate: forgeryRate.toFixed(2),
      confidenceLevel: Math.min(100, Math.max(0, confidenceLevel)).toFixed(1),
      riskLevel: forgeryRate > 5 ? 'High' : forgeryRate > 2 ? 'Medium' : 'Low',
      analysisDate: new Date().toLocaleDateString()
    });
  };

  const handleInputChange = (e, setter) => {
    const value = e.target.value.replace(/\D/g, '');
    setter(Number(value) || 0);
    setEstimationResult(null);
  };

  const riskColor = estimationResult?.riskLevel === 'High' ? '#ef4444' : estimationResult?.riskLevel === 'Medium' ? '#f59e0b' : '#22c55e';

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>
          Forgery Estimation
        </h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
          Estimate forgery probability based on analyzed documents and detected anomalies
        </p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Filter estimations by criteria...'
      />

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1', marginTop: '24px' }}>
          Loading backend data...
        </div>
      ) : error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#fca5a5', marginTop: '24px' }}>
          {error}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px' }}>
          {/* Input Parameters */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>
              Input Parameters
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px 0' }}>
              Enter the number of analyzed documents and detected anomalies to calculate the estimated forgery rate.
            </p>

            {/* Number of Analyzed Documents */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#cbd5e1',
                display: 'block',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Number of Analyzed Documents
              </label>
              <input
                type='text'
                value={analyzedDocuments}
                onChange={(e) => handleInputChange(e, setAnalyzedDocuments)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
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
              <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0 0' }}>
                Total documents processed by the authentication system
              </p>
            </div>

            {/* Number of Detected Anomalies */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#cbd5e1',
                display: 'block',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Number of Detected Anomalies
              </label>
              <input
                type='text'
                value={detectedAnomalies}
                onChange={(e) => handleInputChange(e, setDetectedAnomalies)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
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
              <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0 0' }}>
                Documents flagged as potentially forged (logo, font, stamp, or layout issues)
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateEstimation}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
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
              <Settings size={18} />
              Calculate Estimation
            </button>
          </div>

          {/* Estimation Results */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>
              Estimation Results
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px 0' }}>
              Calculated forgery probability and risk assessment
            </p>

            {estimationResult ? (
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Estimated Forgery Rate */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    Estimated Forgery Rate
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#ef4444' }}>
                    {estimationResult.forgeryRate}%
                  </div>
                </div>

                {/* Confidence Level */}
                <div style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    Confidence Level
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#3b82f6' }}>
                    {estimationResult.confidenceLevel}%
                  </div>
                </div>

                {/* Risk Level */}
                <div style={{
                  background: `${riskColor}08`,
                  border: `1px solid ${riskColor}20`,
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ fontSize: '12px', color: riskColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    Risk Level Classification
                  </div>
                  <div style={{
                    display: 'inline-block',
                    background: riskColor,
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    {estimationResult.riskLevel} Risk
                  </div>
                </div>

                {/* Analysis Summary */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>
                    Based on {analyzedDocuments.toLocaleString()} documents analyzed with {detectedAnomalies} anomalies detected, the estimated forgery rate is <strong>{estimationResult.forgeryRate}%</strong> with a confidence level of <strong>{estimationResult.confidenceLevel}%</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '280px',
                color: '#64748b',
                textAlign: 'center'
              }}>
                <p>Click "Calculate Estimation" to generate results</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Risk Thresholds Info */}
      <div style={{
        marginTop: '48px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '32px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '24px' }}>
          Risk Level Reference
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { level: 'Low Risk', range: '< 2%', color: '#22c55e', description: 'Acceptable forgery rate within normal parameters' },
            { level: 'Medium Risk', range: '2% - 5%', color: '#f59e0b', description: 'Elevated forgery detection requiring monitoring' },
            { level: 'High Risk', range: '> 5%', color: '#ef4444', description: 'Critical forgery rate requiring immediate action' }
          ].map((item) => (
            <div key={item.level} style={{
              background: `${item.color}08`,
              border: `1px solid ${item.color}20`,
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{
                display: 'inline-block',
                background: item.color,
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '12px'
              }}>
                {item.level}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: item.color, marginBottom: '8px' }}>
                {item.range}
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EstimationPage;
