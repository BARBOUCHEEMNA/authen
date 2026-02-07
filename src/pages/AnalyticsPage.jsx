import React from 'react';
import { FileText, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

function AnalyticsPage() {
  const monthlyData = [
    { month: 'Jan', value: 28 },
    { month: 'Feb', value: 38 },
    { month: 'Mar', value: 42 },
    { month: 'Apr', value: 32 },
    { month: 'May', value: 36 },
    { month: 'Jun', value: 48 },
    { month: 'Jul', value: 54 },
    { month: 'Aug', value: 46 },
    { month: 'Sep', value: 30 },
    { month: 'Oct', value: 35 },
    { month: 'Nov', value: 26 },
    { month: 'Dec', value: 25 }
  ];
  
  const maxValue = Math.max(...monthlyData.map(d => d.value));
  const chartHeight = 300;
  const chartWidth = 1100;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  
  // Create path for area chart
  const points = monthlyData.map((d, i) => ({
    x: padding.left + (i / (monthlyData.length - 1)) * innerWidth,
    y: padding.top + innerHeight - (d.value / 60) * innerHeight
  }));
  
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Analytics</h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Comprehensive fraud detection statistics and trends</p>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <FileText size={20} color="#3b82f6" />
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Documents Analyzed
            </span>
          </div>
          <div style={{ fontSize: '40px', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>12,847</div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <AlertTriangle size={20} color="#ef4444" />
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Frauds Detected
            </span>
          </div>
          <div style={{ fontSize: '40px', fontWeight: '700', color: '#ef4444', letterSpacing: '-0.02em' }}>423</div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <TrendingUp size={20} color="#f59e0b" />
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Fraud Detection Rate
            </span>
          </div>
          <div style={{ fontSize: '40px', fontWeight: '700', color: '#f59e0b', letterSpacing: '-0.02em' }}>3.29%</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        {/* Fraud Types Distribution */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <BarChart3 size={22} color="#3b82f6" />
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
              Fraud Types Distribution
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Logo', value: 180, color: '#3b82f6' },
              { label: 'Font', value: 145, color: '#14b8a6' },
              { label: 'Stamp', value: 115, color: '#f59e0b' },
              { label: 'Layout', value: 95, color: '#ec4899' }
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '80px',
                  fontSize: '14px',
                  color: '#cbd5e1',
                  fontWeight: '500'
                }}>
                  {item.label}
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <div style={{
                    height: '32px',
                    background: `${item.color}`,
                    borderRadius: '6px',
                    width: `${(item.value / 180) * 100}%`,
                    transition: 'width 0.5s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '12px'
                  }}>
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Authenticity Distribution */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <FileText size={22} color="#3b82f6" />
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
              Document Authenticity Distribution
            </h3>
          </div>
          <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
            {/* Donut Chart */}
            <svg viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="30"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#22c55e"
                strokeWidth="30"
                strokeDasharray={`${2 * Math.PI * 80 * 0.967} ${2 * Math.PI * 80}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#ef4444"
                strokeWidth="30"
                strokeDasharray={`${2 * Math.PI * 80 * 0.033} ${2 * Math.PI * 80}`}
                strokeDashoffset={`-${2 * Math.PI * 80 * 0.967}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '0',
              right: '0',
              display: 'flex',
              justifyContent: 'center',
              gap: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: '#22c55e',
                  borderRadius: '2px'
                }} />
                <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '600' }}>Authentic</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: '#ef4444',
                  borderRadius: '2px'
                }} />
                <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '600' }}>Forged</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '28px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <TrendingUp size={22} color="#3b82f6" />
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
            Fraud Detection Trend (Monthly)
          </h3>
        </div>
        <div style={{ position: 'relative' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto' }}>
            {/* Grid lines */}
            {[0, 15, 30, 45, 60].map((value) => {
              const y = padding.top + innerHeight - (value / 60) * innerHeight;
              return (
                <g key={value}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    fill="#64748b"
                    fontSize="12"
                    textAnchor="end"
                    fontWeight="500"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            
            {/* Area fill */}
            <path
              d={areaPath}
              fill="url(#areaGradient)"
              opacity="0.4"
            />
            
            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Points */}
            {points.map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3b82f6"
                stroke="#0f172a"
                strokeWidth="2"
              />
            ))}
            
            {/* X-axis labels */}
            {monthlyData.map((d, i) => {
              const x = padding.left + (i / (monthlyData.length - 1)) * innerWidth;
              return (
                <text
                  key={i}
                  x={x}
                  y={chartHeight - padding.bottom + 25}
                  fill="#64748b"
                  fontSize="13"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {d.month}
                </text>
              );
            })}
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
