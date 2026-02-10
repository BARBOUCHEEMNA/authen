const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  documentsAnalyzed: {
    type: Number,
    default: 0
  },
  fraudsDetected: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('University', universitySchema);
