const mongoose = require('mongoose');

const fraudDetectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#3b82f6'
  }
});

module.exports = mongoose.model('FraudDetection', fraudDetectionSchema);
