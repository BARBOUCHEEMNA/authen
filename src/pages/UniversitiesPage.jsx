import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import AddUniversityModal from '../components/AddUniversityModal';

function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universities, setUniversities] = useState([
    { id: 1, name: 'Medtech', country: 'Tunisia', email: '@medtech.tn', status: 'active', created: '2024-01-15' },
    { id: 2, name: 'Esprit', country: 'Tunisia', email: '@esprit.tn', status: 'active', created: '2024-01-20' },
    { id: 3, name: 'INSAT', country: 'Tunisia', email: '@insat.tn', status: 'active', created: '2024-02-01' },
    { id: 4, name: 'ENIT', country: 'Tunisia', email: '@enit.tn', status: 'active', created: '2024-02-10' },
    { id: 5, name: 'MSE', country: 'Tunisia', email: '@mse.tn', status: 'active', created: '2024-02-15' }
  ]);

  const filteredUniversities = searchTerm
    ? universities.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : universities;

  const handleOpenModal = (university = null) => {
    setEditingUniversity(university);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUniversity(null);
  };

  const handleAddOrEditUniversity = (formData) => {
    if (editingUniversity) {
      // Edit existing university
      setUniversities((prev) =>
        prev.map((uni) =>
          uni.id === editingUniversity.id
            ? {
                ...uni,
                name: formData.name,
                country: formData.country,
                email: '@' + formData.email,
                status: formData.status
              }
            : uni
        )
      );
    } else {
      // Add new university
      const newUniversity = {
        id: Math.max(...universities.map((u) => u.id), 0) + 1,
        name: formData.name,
        country: formData.country,
        email: '@' + formData.email,
        status: formData.status,
        created: new Date().toISOString().split('T')[0]
      };
      setUniversities((prev) => [...prev, newUniversity]);
    }
    handleCloseModal();
  };

  const handleDeleteUniversity = (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      setUniversities((prev) => prev.filter((uni) => uni.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Universities</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Manage partner universities and their settings</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
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
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s ease'
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
          <Plus size={18} />
          Add University
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search universities by name or email...' />

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
              {['University Name', 'Country', 'Email Domain', 'Status', 'Created', 'Actions'].map((header) => (
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
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px 24px', color: '#fff', fontSize: '14px', fontWeight: '500' }}>{uni.name}</td>
                <td style={{ padding: '20px 24px', color: '#cbd5e1', fontSize: '14px' }}>{uni.country}</td>
                <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px', fontFamily: 'monospace' }}>{uni.email}</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{
                    background: uni.status === 'active' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: uni.status === 'active' ? '#3b82f6' : '#ef4444',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {uni.status}
                  </span>
                </td>
                <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>{uni.created}</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => handleOpenModal(uni)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUniversity(uni.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#ef4444'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUniversityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddOrEditUniversity}
        editingUniversity={editingUniversity}
      />
    </div>
  );
}

export default UniversitiesPage;
