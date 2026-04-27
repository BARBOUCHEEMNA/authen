import React, { useState, useEffect } from 'react';
import { FileText, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { apiClient } from '../utils/apiClient';

function AnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [analytics, setAnalytics] = useState([]);
  const [fraudTypes, setFraudTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const [analyticsData, fraudData] = await Promise.all([
          apiClient.getAnalyticsData(),
          apiClient.getFraudDetectionData()
        ]);

        setAnalytics(Array.isArray(analyticsData) ? analyticsData : []);
        setFraudTypes(Array.isArray(fraudData) ? fraudData : []);
      } catch (err) {
        console.error('Error loading analytics data:', err);
        setError('Unable to load analytics from the backend.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totalDocuments = analytics.reduce((sum, item) => sum + (item.documentsAnalyzed || 0), 0);
  const totalFrauds = analytics.reduce((sum, item) => sum + (item.fraudCount || 0), 0);
  const detectionRate = analytics.length
    ? analytics.reduce((sum, item) => sum + (item.detectionRate || 0), 0) / analytics.length
    : 0;

  const monthlyData = analytics.map((item) => ({
    month: item.month || 'Unknown',
    value: item.fraudCount || 0
  }));

  const filteredFraudTypes = searchTerm
    ? fraudTypes.filter((item) => (item.type || item.label || '').toLowerCase().includes(searchTerm.toLowerCase()))
    : fraudTypes;

  const chartWidth = 1100;
  const chartHeight = 300;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  const maxValue = Math.max(...monthlyData.map((d) => d.value), 60);

  const points = monthlyData.map((d, i) => ({
    x: padding.left + (i / Math.max(monthlyData.length - 1, 1)) * innerWidth,
    y: padding.top + innerHeight - ((d.value || 0) / maxValue) * innerHeight
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${padding.top + innerHeight} L ${points[0]?.x || 0} ${padding.top + innerHeight} Z`;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Analytics</h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Comprehensive MedTech/MSB fraud detection metrics loaded from backend analytics.</p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Filter analytics by fraud type...'
      />

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1' }}>Loading analytics...</div>
      ) : error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#fca5a5' }}>{error}</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <FileText size={20} color='#3b82f6' />
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Documents Analyzed
                </span>
              </div>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>{totalDocuments.toLocaleString()}</div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <AlertTriangle size={20} color='#ef4444' />
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Frauds Detected
                </span>
              </div>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#ef4444', letterSpacing: '-0.02em' }}>{totalFrauds.toLocaleString()}</div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <TrendingUp size={20} color='#f59e0b' />
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Average Detection Rate
                </span>
              </div>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#f59e0b', letterSpacing: '-0.02em' }}>{detectionRate.toFixed(2)}%</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <BarChart3 size={22} color='#3b82f6' />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Fraud Types Distribution
                </h3>
              </div>
              {filteredFraudTypes.length === 0 ? (
                <div style={{ color: '#94a3b8', padding: '24px 0' }}>No fraud type breakdown available yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {filteredFraudTypes.map((item) => (
                    <div key={item._id || item.type || item.label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '90px',
                        fontSize: '14px',
                        color: '#cbd5e1',
                        fontWeight: '500'
                      }}>
                        {item.type || item.label}
                      </div>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <div style={{
                          height: '32px',
                          background: '#1f2937',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(100, ((item.percentage || item.value || 0) / 100) * 100)}%`,
                            background: item.color || '#3b82f6',
                            borderRadius: '6px',
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                        <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#fff', fontSize: '13px', fontWeight: '600' }}>
                          {item.percentage != null ? `${item.percentage}%` : `${item.value || 0}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <FileText size={22} color='#3b82f6' />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Authenticity Insights
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Latest detection rate
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#22c55e' }}>{detectionRate.toFixed(2)}%</div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.7' }}>
                    Analytics are loaded from the backend and reflect active MedTech/MSB verification tracking. AI model results will be displayed in this view once the backend integration is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '28px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <TrendingUp size={22} color='#3b82f6' />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
                Fraud Detection Trend
              </h3>
            </div>
            {monthlyData.length === 0 ? (
              <div style={{ color: '#94a3b8', padding: '40px 0', textAlign: 'center' }}>No monthly fraud trend data available yet.</div>
            ) : (
              <div style={{ position: 'relative' }}>
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto' }}>
                  {[0, 15, 30, 45, 60].map((value) => {
                    const y = padding.top + innerHeight - (value / maxValue) * innerHeight;
                    return (
                      <g key={value}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke='rgba(255, 255, 255, 0.05)'
                          strokeWidth='1'
                          strokeDasharray='4 4'
                        />
                        <text
                          x={padding.left - 10}
                          y={y + 4}
                          fill='#64748b'
                          fontSize='12'
                          textAnchor='end'
                          fontWeight='500'
                        >
                          {value}
                        </text>
                      </g>
                    );
                  })}

                  <path
                    d={areaPath}
                    fill='url(#areaGradient)'
                    opacity='0.4'
                  />
                  <path
                    d={linePath}
                    fill='none'
                    stroke='#3b82f6'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  {points.map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r='4'
                      fill='#3b82f6'
                      stroke='#0f172a'
                      strokeWidth='2'
                    />
                  ))}
                  {monthlyData.map((d, i) => {
                    const x = padding.left + (i / Math.max(monthlyData.length - 1, 1)) * innerWidth;
                    return (
                      <text
                        key={i}
                        x={x}
                        y={chartHeight - padding.bottom + 25}
                        fill='#64748b'
                        fontSize='13'
                        textAnchor='middle'
                        fontWeight='500'
                      >
                        {d.month}
                      </text>
                    );
                  })}
                  <defs>
                    <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.5' />
                      <stop offset='100%' stopColor='#3b82f6' stopOpacity='0.05' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyticsPage;
