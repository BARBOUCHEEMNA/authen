const mongoose = require('mongoose');
require('dotenv').config();

const DashboardStats = require('./models/DashboardStats');
const FraudDetection = require('./models/FraudDetection');
const Analytics = require('./models/Analytics');
const University = require('./models/University');
const FraudCase = require('./models/FraudCase');
const Template = require('./models/Template');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authentiqa');
    console.log('Connected to MongoDB');

    // Clear existing data
    await DashboardStats.deleteMany({});
    await FraudDetection.deleteMany({});
    await Analytics.deleteMany({});
    await University.deleteMany({});
    await FraudCase.deleteMany({});
    await Template.deleteMany({});

    // Seed Dashboard Stats
    await DashboardStats.create({
      totalDocuments: 12847,
      totalDocumentsChange: '+12.5%',
      fraudsDetected: 423,
      fraudsDetectedChange: '3.2%',
      fraudRate: 3.29,
      activeUniversities: 5,
      universitiesChange: '+8.1%'
    });

    // Seed Fraud Detection Types
    const fraudTypes = [
      { type: 'Logo', value: 145, percentage: 34.3, color: '#3b82f6' },
      { type: 'Font', value: 118, percentage: 27.9, color: '#f59e0b' },
      { type: 'Stamp', value: 98, percentage: 23.2, color: '#ef4444' },
      { type: 'Layout', value: 62, percentage: 14.6, color: '#8b5cf6' }
    ];
    await FraudDetection.insertMany(fraudTypes);

    // Seed Analytics Data (Monthly)
    const monthlyData = [
      { month: 'Jan', fraudCount: 28, documentsAnalyzed: 1200, detectionRate: 2.3 },
      { month: 'Feb', fraudCount: 38, documentsAnalyzed: 1450, detectionRate: 2.6 },
      { month: 'Mar', fraudCount: 42, documentsAnalyzed: 1680, detectionRate: 2.5 },
      { month: 'Apr', fraudCount: 32, documentsAnalyzed: 1500, detectionRate: 2.1 },
      { month: 'May', fraudCount: 36, documentsAnalyzed: 1650, detectionRate: 2.2 },
      { month: 'Jun', fraudCount: 48, documentsAnalyzed: 1820, detectionRate: 2.6 },
      { month: 'Jul', fraudCount: 54, documentsAnalyzed: 2000, detectionRate: 2.7 },
      { month: 'Aug', fraudCount: 46, documentsAnalyzed: 1900, detectionRate: 2.4 },
      { month: 'Sep', fraudCount: 30, documentsAnalyzed: 1450, detectionRate: 2.1 },
      { month: 'Oct', fraudCount: 35, documentsAnalyzed: 1550, detectionRate: 2.3 },
      { month: 'Nov', fraudCount: 26, documentsAnalyzed: 1300, detectionRate: 2.0 },
      { month: 'Dec', fraudCount: 25, documentsAnalyzed: 1280, detectionRate: 1.95 }
    ];
    await Analytics.insertMany(monthlyData);

    // Seed Universities
    const universities = [
      { name: 'South Mediterranean University', location: 'Tunisia', documentsAnalyzed: 2500, fraudsDetected: 85, status: 'active' },
      { name: 'University of Cairo', location: 'Egypt', documentsAnalyzed: 3200, fraudsDetected: 120, status: 'active' },
      { name: 'King Saud University', location: 'Saudi Arabia', documentsAnalyzed: 2800, fraudsDetected: 95, status: 'active' },
      { name: 'American University of Beirut', location: 'Lebanon', documentsAnalyzed: 2100, fraudsDetected: 72, status: 'active' },
      { name: 'University of Jordan', location: 'Jordan', documentsAnalyzed: 1900, fraudsDetected: 51, status: 'active' }
    ];
    await University.insertMany(universities);

    // Seed Fraud Cases
    const fraudCases = [
      { caseId: 'FC001', university: 'South Mediterranean University', documentType: 'Diploma', fraudType: 'Logo Forgery', severity: 'high', status: 'resolved', description: 'Forged university logo on diploma' },
      { caseId: 'FC002', university: 'University of Cairo', documentType: 'Certificate', fraudType: 'Font Modification', severity: 'medium', status: 'verified', description: 'Font size altered in certificate' },
      { caseId: 'FC003', university: 'King Saud University', documentType: 'Diploma', fraudType: 'Stamp Forgery', severity: 'high', status: 'pending', description: 'Fake official stamp detected' },
      { caseId: 'FC004', university: 'American University of Beirut', documentType: 'Transcript', fraudType: 'Layout Changes', severity: 'low', status: 'resolved', description: 'Minor layout modifications' },
      { caseId: 'FC005', university: 'University of Jordan', documentType: 'Diploma', fraudType: 'Multiple Issues', severity: 'high', status: 'verified', description: 'Multiple authentication failures' }
    ];
    await FraudCase.insertMany(fraudCases);

    // Seed Templates
    const templates = [
      { name: 'Standard Diploma', university: 'South Mediterranean University', documentType: 'Diploma', status: 'active', description: 'Official diploma template' },
      { name: 'Transcript Template', university: 'University of Cairo', documentType: 'Transcript', status: 'active', description: 'Academic transcript template' },
      { name: 'Certificate Template', university: 'King Saud University', documentType: 'Certificate', status: 'active', description: 'Course completion certificate' },
      { name: 'Advanced Diploma', university: 'American University of Beirut', documentType: 'Diploma', status: 'archived', description: 'Old diploma format' }
    ];
    await Template.insertMany(templates);

    console.log('Database seeded successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
