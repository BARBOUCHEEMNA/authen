const mongoose = require('mongoose');

const fraudCaseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
    unique: true
  },
  university: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    default: 'Diploma'
  },
  fraudType: {
    type: String,
    default: 'Logo Forgery'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  detectedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'resolved'],
    default: 'pending'
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('FraudCase', fraudCaseSchema);
