import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import SearchBar from '../components/SearchBar';
import AddUniversityModal from '../components/AddUniversityModal';
import { formatTimestamp } from '../utils/formatTimestamp';

function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUniversities = async () => {
    setIsLoading(true);
    setError('');

    try {
      const universitiesRef = collection(db, 'universities');
      const snapshot = await getDocs(universitiesRef);

      const rows = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name || '',
          country: data.country || data.country_name || '',
          email: data.emailDomain || data.email_domain || data.email || '',
          status: data.status || 'active',
          created: formatTimestamp(data.createdAt || data.created_at || data.created || new Date()),
        };
      });

      setUniversities(rows);
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError(`Error: ${err.message || 'Failed to load universities'}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const filteredUniversities = searchTerm
    ? universities.filter((uni) =>
        (uni.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (uni.email || '').toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddOrEditUniversity = async (formData) => {
    setError('');

    try {
      if (editingUniversity) {
        const universityRef = doc(db, 'universities', editingUniversity.id);
        await updateDoc(universityRef, {
          name: formData.name,
          country: formData.country,
          email: formData.email.startsWith('@') ? formData.email : `@${formData.email}`,
          status: formData.status,
          updatedAt: new Date()
        });
        setUniversities((prev) =>
          prev.map((uni) =>
            uni.id === editingUniversity.id
              ? {
                  ...uni,
                  name: formData.name,
                  country: formData.country,
                  email: formData.email.startsWith('@') ? formData.email : `@${formData.email}`,
                  status: formData.status
                }
              : uni
          )
        );
      } else {
        const universitiesRef = collection(db, 'universities');
        const createdDoc = await addDoc(universitiesRef, {
          name: formData.name,
          country: formData.country,
          email: formData.email.startsWith('@') ? formData.email : `@${formData.email}`,
          status: formData.status,
          createdAt: new Date()
        });

        setUniversities((prev) => [
          {
            id: createdDoc.id,
            name: formData.name,
            country: formData.country,
            email: formData.email.startsWith('@') ? formData.email : `@${formData.email}`,
            status: formData.status,
            created: formatTimestamp(new Date())
          },
          ...prev
        ]);
      }
    } catch (err) {
      console.error('Error saving university:', err);
      setError(`Error: ${err.message || 'Could not save university'}`);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteUniversity = async (id) => {
    if (!window.confirm('Are you sure you want to delete this university?')) {
      return;
    }

    setError('');

    try {
      const universityRef = doc(db, 'universities', id);
      await deleteDoc(universityRef);
      setUniversities((prev) => prev.filter((uni) => uni.id !== id));
    } catch (err) {
      console.error('Error deleting university:', err);
      setError(`Error: ${err.message || 'Could not delete university'}`);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Universities</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Manage MedTech/MSB partner universities and settings.</p>
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
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1' }}>Loading universities...</div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#fca5a5' }}>{error}</div>
        ) : filteredUniversities.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1' }}>
            No universities found. Add a MedTech/MSB partner or check your backend data.
          </div>
        ) : (
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
              {filteredUniversities.map((uni) => (
                <tr key={uni.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
        )}
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
