// API Base URL - will use proxy if available, otherwise falls back to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Dashboard endpoints
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return null;
    }
  },

  // Fraud detection endpoints
  getFraudDetectionData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fraud`);
      if (!response.ok) throw new Error('Failed to fetch fraud data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fraud data:', error);
      return [];
    }
  },

  // Analytics endpoints
  getAnalyticsData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return [];
    }
  },

  // Universities endpoints
  getUniversities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/universities`);
      if (!response.ok) throw new Error('Failed to fetch universities');
      return await response.json();
    } catch (error) {
      console.error('Error fetching universities:', error);
      return [];
    }
  },

  createUniversity: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/universities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create university');
      return await response.json();
    } catch (error) {
      console.error('Error creating university:', error);
      return null;
    }
  },

  updateUniversity: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/universities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update university');
      return await response.json();
    } catch (error) {
      console.error('Error updating university:', error);
      return null;
    }
  },

  // Fraud cases endpoints
  getFraudCases: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fraud-cases`);
      if (!response.ok) throw new Error('Failed to fetch fraud cases');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fraud cases:', error);
      return [];
    }
  },

  createFraudCase: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fraud-cases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create fraud case');
      return await response.json();
    } catch (error) {
      console.error('Error creating fraud case:', error);
      return null;
    }
  },

  // Templates endpoints
  getTemplates: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates`);
      if (!response.ok) throw new Error('Failed to fetch templates');
      return await response.json();
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  },

  createTemplate: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create template');
      return await response.json();
    } catch (error) {
      console.error('Error creating template:', error);
      return null;
    }
  }
};
