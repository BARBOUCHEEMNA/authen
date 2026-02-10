import React, { useState, useEffect } from 'react';
import { BarChart3, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import { apiClient } from '../utils/apiClient';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [fraudData, setFraudData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, fraudDetectionData] = await Promise.all([
          apiClient.getDashboardStats(),
          apiClient.getFraudDetectionData()
        ]);
        
        if (statsData) {
          setStats(statsData);
        }
        if (fraudDetectionData && Array.isArray(fraudDetectionData)) {
          setFraudData(fraudDetectionData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', fontSize: '18px' }}>Loading dashboard...</div>;
  }

  const displayStats = stats || {
    totalDocuments: 12847,
    totalDocumentsChange: '+12.5%',
    fraudsDetected: 423,
    fraudsDetectedChange: '3.2%',
    fraudRate: 3.29,
    activeUniversities: 5,
    universitiesChange: '+8.1%'
  };

  const maxFraudValue = fraudData.length > 0 
    ? Math.max(...fraudData.map(d => d.value || 0))
    : 160;

  return (
    <div>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <StatCard
          title="Total Documents"
          value={displayStats.totalDocuments?.toLocaleString()}
          subtitle="Analyzed this year"
          change={`${displayStats.totalDocumentsChange} vs last month`}
          color="#3b82f6"
          icon="📄"
        />
        <StatCard
          title="Frauds Detected"
          value={displayStats.fraudsDetected?.toLocaleString()}
          subtitle="Cases flagged"
          change={`${displayStats.fraudsDetectedChange} vs last month`}
          color="#f59e0b"
          icon="⚠️"
        />
        <StatCard
          title="Fraud Rate"
          value={`${displayStats.fraudRate}%`}
          subtitle="Detection accuracy"
          change=""
          color="#14b8a6"
          icon="📊"
        />
        <StatCard
          title="Universities"
          value={displayStats.activeUniversities}
          subtitle="Active partners"
          change={`${displayStats.universitiesChange} vs last month`}
          color="#22c55e"
          icon="🎓"
        />
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
            {fraudData.length > 0 ? (
              fraudData.map((item) => (
                <div key={item.type || item._id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>{item.type}</span>
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
                      width: `${(item.value / maxFraudValue) * 100}%`,
                      background: item.color || 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                      borderRadius: '5px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#94a3b8' }}>No fraud data available</p>
            )}
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
