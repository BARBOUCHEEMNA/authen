const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authentiqa')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/fraud', require('./routes/fraud'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/universities', require('./routes/universities'));
app.use('/api/fraud-cases', require('./routes/fraudCases'));
app.use('/api/templates', require('./routes/templates'));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
