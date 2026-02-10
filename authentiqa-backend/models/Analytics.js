const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  fraudCount: {
    type: Number,
    default: 0
  },
  documentsAnalyzed: {
    type: Number,
    default: 0
  },
  detectionRate: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
