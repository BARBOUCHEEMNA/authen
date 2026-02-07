import React, { useState } from 'react';
import { Settings } from 'lucide-react';

function EstimationPage() {
  const [analyzedDocs, setAnalyzedDocs] = useState('');
  const [detectedAnomalies, setDetectedAnomalies] = useState('');
  const [result, setResult] = useState(null);

  const calculateEstimation = () => {
    const docs = parseInt(analyzedDocs) || 0;
    const anomalies = parseInt(detectedAnomalies) || 0;
    
    if (docs > 0 && anomalies >= 0) {
      const forgeryRate = ((anomalies / docs) * 100).toFixed(2);
      const confidenceLevel = anomalies > 0 ? Math.min(95, 70 + (anomalies / docs) * 100).toFixed(1) : 0;
      
      let riskLevel = 'Low';
      let riskColor = '#22c55e';
      
      if (parseFloat(forgeryRate) > 5) {
        riskLevel = 'High';
        riskColor = '#ef4444';
      } else if (parseFloat(forgeryRate) > 2) {
        riskLevel = 'Medium';
        riskColor = '#f59e0b';
      }
      
      setResult({
        forgeryRate,
        confidenceLevel,
        riskLevel,
        riskColor,
        authenticDocs: docs - anomalies,
        forgedDocs: anomalies
      });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Settings size={28} color="#3b82f6" />
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '4px' }}>
            Forgery Estimation
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Estimate forgery probability based on analyzed documents and detected anomalies
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Input Parameters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '32px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>
            Input Parameters
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '32px' }}>
            Enter the number of analyzed documents and detected anomalies to calculate the estimated forgery rate.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
              Number of Analyzed Documents
            </label>
            <input
              type="text"
              placeholder="e.g., 1000"
              value={analyzedDocs}
              onChange={(e) => setAnalyzedDocs(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.background = 'rgba(59, 130, 246, 0.05)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', marginBottom: 0 }}>
              Total documents processed by the authentication system
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
              Number of Detected Anomalies
            </label>
            <input
              type="text"
              placeholder="e.g., 35"
              value={detectedAnomalies}
              onChange={(e) => setDetectedAnomalies(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.background = 'rgba(59, 130, 246, 0.05)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', marginBottom: 0 }}>
              Documents flagged as potentially forged (logo, font, stamp, or layout issues)
            </p>
          </div>

          <button
            onClick={calculateEstimation}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(30, 64, 175, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 64, 175, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(30, 64, 175, 0.3)';
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
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>
            Estimation Results
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '32px' }}>
            Calculated forgery probability and risk assessment
          </p>

          {!result ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(148, 163, 184, 0.1)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Settings size={40} color="#64748b" />
              </div>
              <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '300px', margin: 0 }}>
                Enter the parameters and click calculate to see results
              </p>
            </div>
          ) : (
            <div>
              {/* Forgery Rate */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Estimated Forgery Rate
                </div>
                <div style={{ fontSize: '48px', fontWeight: '700', color: '#ef4444', letterSpacing: '-0.02em' }}>
                  {result.forgeryRate}%
                </div>
              </div>

              {/* Confidence Level */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Confidence Level
                </div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#3b82f6', letterSpacing: '-0.02em' }}>
                  {result.confidenceLevel}%
                </div>
              </div>

              {/* Risk Level */}
              <div style={{
                background: `${result.riskColor}15`,
                border: `1px solid ${result.riskColor}30`,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Risk Level
                </div>
                <div style={{
                  display: 'inline-block',
                  background: result.riskColor,
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: '700'
                }}>
                  {result.riskLevel}
                </div>
              </div>

              {/* Document Breakdown */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Authentic Documents</span>
                  <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '700' }}>{result.authenticDocs}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Forged Documents</span>
                  <span style={{ fontSize: '16px', color: '#ef4444', fontWeight: '700' }}>{result.forgedDocs}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Risk Level Thresholds */}
      <div style={{
        marginTop: '32px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '32px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '24px' }}>
          Risk Level Thresholds
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { level: 'Low Risk', range: '< 2%', color: '#22c55e', description: 'Acceptable forgery rate within normal parameters' },
            { level: 'Medium Risk', range: '2% - 5%', color: '#f59e0b', description: 'Elevated forgery detection requiring monitoring' },
            { level: 'High Risk', range: '> 5%', color: '#ef4444', description: 'Critical forgery rate requiring immediate action' }
          ].map((item) => (
            <div key={item.level} style={{
              background: `${item.color}10`,
              border: `1px solid ${item.color}30`,
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{
                display: 'inline-block',
                background: item.color,
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
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
