const mongoose = require('mongoose');

const dashboardStatsSchema = new mongoose.Schema({
  totalDocuments: {
    type: Number,
    default: 12847
  },
  totalDocumentsChange: {
    type: String,
    default: '+12.5%'
  },
  fraudsDetected: {
    type: Number,
    default: 423
  },
  fraudsDetectedChange: {
    type: String,
    default: '3.2%'
  },
  fraudRate: {
    type: Number,
    default: 3.29
  },
  activeUniversities: {
    type: Number,
    default: 5
  },
  universitiesChange: {
    type: String,
    default: '+8.1%'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DashboardStats', dashboardStatsSchema);
