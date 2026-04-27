import React, { useState, useEffect } from 'react';
import { Edit, Trash2, FileText } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { apiClient } from '../utils/apiClient';

const DEFAULT_TEMPLATES = [
  {
    id: 'default-cert-1',
    university: 'MedTech/MSB',
    documentType: 'Student Certificate',
    status: 'ACTIVE',
    requiredFields: ['studentName', 'studentID', 'completionDate', 'signature'],
    createdAt: new Date(),
    updatedAt: new Date(),
    font: 'Default',
    version: '1.0',
    stamp: true
  },
  {
    id: 'default-transcript-1',
    university: 'MedTech/MSB',
    documentType: 'Transcript',
    status: 'ACTIVE',
    requiredFields: ['studentName', 'studentID', 'courseList', 'GPA', 'academicPeriod'],
    createdAt: new Date(),
    updatedAt: new Date(),
    font: 'Default',
    version: '1.0',
    stamp: false
  },
  {
    id: 'default-enrollment-1',
    university: 'MedTech/MSB',
    documentType: 'Enrollment Certificate',
    status: 'ACTIVE',
    requiredFields: ['studentName', 'studentID', 'enrollmentDate', 'programName', 'status'],
    createdAt: new Date(),
    updatedAt: new Date(),
    font: 'Default',
    version: '1.0',
    stamp: true
  },
  {
    id: 'default-internship-1',
    university: 'MedTech/MSB',
    documentType: 'Internship Agreement',
    status: 'ACTIVE',
    requiredFields: ['studentName', 'studentID', 'companyName', 'startDate', 'endDate', 'supervisor'],
    createdAt: new Date(),
    updatedAt: new Date(),
    font: 'Default',
    version: '1.0',
    stamp: true
  },
  {
    id: 'default-diploma-1',
    university: 'MedTech/MSB',
    documentType: 'Diploma',
    status: 'ACTIVE',
    requiredFields: ['studentName', 'studentID', 'degreeType', 'graduationDate', 'honoursStatus', 'president'],
    createdAt: new Date(),
    updatedAt: new Date(),
    font: 'Default',
    version: '1.0',
    stamp: true
  }
];

function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await apiClient.getTemplates();
        const backendTemplates = Array.isArray(data) ? data : [];
        
        // If no backend templates, use defaults
        if (backendTemplates.length === 0) {
          setTemplates(DEFAULT_TEMPLATES);
        } else {
          setTemplates(backendTemplates);
        }
      } catch (err) {
        console.error('Error loading templates:', err);
        // On error, fall back to defaults
        setTemplates(DEFAULT_TEMPLATES);
        setError('');
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const visibleTemplates = templates.map((template) => ({
    id: template._id || template.id || template.name,
    university: template.university || 'MedTech/MSB',
    docType: template.documentType || template.document_type || template.name || 'Template',
    font: template.font || template.fontType || 'Default',
    version: template.version || template.templateVersion || '1.0',
    stamp: template.stamp ? 'Yes' : template.requiresStamp ? 'Yes' : 'No',
    status: (template.status || 'active').toLowerCase(),
    requiredFieldsCount: Array.isArray(template.requiredFields) ? template.requiredFields.length : 0,
    requiredFieldsList: Array.isArray(template.requiredFields) ? template.requiredFields.join(', ') : '',
    created: template.createdDate || template.lastUpdated || template.createdAt || template.created || '',
  }));

  const filteredTemplates = searchTerm
    ? visibleTemplates.filter((template) =>
        [template.university, template.docType, template.font, template.status, template.requiredFieldsList]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : visibleTemplates;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Templates</h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Manage MedTech/MSB document templates and backend-provided schema.</p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search templates by university, document type, or status...'
      />

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        marginTop: '24px'
      }}>
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1' }}>
            Loading templates...
          </div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#fca5a5' }}>
            {error}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#cbd5e1' }}>
            No templates found. Try adjusting your search.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                {['University', 'Document Type', 'Font Type', 'Version', 'Required Fields', 'Stamp', 'Status', 'Actions'].map((header) => (
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
              {filteredTemplates.map((template, idx) => (
                <tr key={template.id || idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '20px 24px', color: '#fff', fontSize: '14px', fontWeight: '500' }}>{template.university}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      background: 'rgba(148, 163, 184, 0.15)',
                      color: '#cbd5e1',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <FileText size={14} />
                      {template.docType}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#cbd5e1', fontSize: '14px' }}>{template.font}</td>
                  <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px', fontFamily: 'monospace' }}>{template.version}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: '#3b82f6',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {template.requiredFieldsCount} field{template.requiredFieldsCount !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      background: template.stamp === 'Yes' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                      color: template.stamp === 'Yes' ? '#3b82f6' : '#94a3b8',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {template.stamp}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      background: template.status === 'active' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: template.status === 'active' ? '#3b82f6' : '#ef4444',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {template.status}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
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
                      <button style={{
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
    </div>
  );
}

export default TemplatesPage;
