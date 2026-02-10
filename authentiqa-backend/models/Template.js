const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    default: 'Diploma'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Template', templateSchema);
