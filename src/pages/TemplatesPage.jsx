import React, { useState } from 'react';
import { Edit, Trash2, FileText } from 'lucide-react';
import SearchBar from '../components/SearchBar';

function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const templates = [
    { university: 'Medtech', docType: 'Transcript', font: 'Times New Roman', version: 'v2.1', stamp: 'Yes', created: '2024-01-20' },
    { university: 'Medtech', docType: 'Diploma', font: 'Garamond', version: 'v3.0', stamp: 'Yes', created: '2024-01-22' },
    { university: 'Esprit', docType: 'Transcript', font: 'Arial', version: 'v1.5', stamp: 'Yes', created: '2024-02-05' },
    { university: 'INSAT', docType: 'Attestation', font: 'Helvetica', version: 'v2.0', stamp: 'No', created: '2024-02-10' },
    { university: 'ENIT', docType: 'Diploma', font: 'Georgia', version: 'v2.3', stamp: 'Yes', created: '2024-02-20' },
    { university: 'MSE', docType: 'Transcript', font: 'Palatino', version: 'v1.8', stamp: 'Yes', created: '2024-03-01' }
  ];

  const filteredTemplates = searchTerm
    ? templates.filter(template =>
        template.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.docType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.font.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : templates;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '8px' }}>Templates</h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Manage document templates for each university</p>
      </div>

      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search templates by university, document type, or font...' />

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
              {['University', 'Document Type', 'Font Type', 'Version', 'Stamp Required', 'Created', 'Actions'].map((header) => (
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
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
                <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>{template.created}</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      padding: '4px'
                    }}>
                      <Edit size={18} />
                    </button>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '4px'
                    }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TemplatesPage;
