import React, { useState } from 'react';
import { BarChart3, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const statCardsData = [
    { title: 'Total Documents', value: '12,847', subtitle: 'Analyzed this year', change: '+12.5% vs last month', color: '#3b82f6', icon: '📄' },
    { title: 'Frauds Detected', value: '423', subtitle: 'Cases flagged', change: '3.2% vs last month', color: '#f59e0b', icon: '⚠️' },
    { title: 'Fraud Rate', value: '3.29%', subtitle: 'Detection accuracy', change: '', color: '#14b8a6', icon: '📊' },
    { title: 'Universities', value: '5', subtitle: 'Active partners', change: '+8.1% vs last month', color: '#22c55e', icon: '🎓' }
  ];

  const filteredCards = searchTerm
    ? statCardsData.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : statCardsData;

  return (
    <div>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search stats...' />
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {filteredCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            change={card.change}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Fraud by Detection Type */}
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
              Fraud by Detection Type
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Logo', value: 145, max: 160 },
              { label: 'Font', value: 118, max: 160 },
              { label: 'Stamp', value: 98, max: 160 },
              { label: 'Layout', value: 62, max: 160 }
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>{item.label}</span>
                  <span style={{ fontSize: '14px', color: '#fff', fontWeight: '600' }}>{item.value}</span>
                </div>
                <div style={{
                  height: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(item.value / item.max) * 100}%`,
                    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                    borderRadius: '5px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Authenticity */}
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
              Document Authenticity
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
                strokeWidth="25"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#22c55e"
                strokeWidth="25"
                strokeDasharray={`${2 * Math.PI * 80 * 0.967} ${2 * Math.PI * 80}`}
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#ef4444"
                strokeWidth="25"
                strokeDasharray={`${2 * Math.PI * 80 * 0.033} ${2 * Math.PI * 80}`}
                strokeDashoffset={`-${2 * Math.PI * 80 * 0.967}`}
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600', marginBottom: '8px' }}>
                Authentic: 96.7%
              </div>
              <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '600' }}>
                Forged: 3.3%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
