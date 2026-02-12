const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Get all analytics data
router.get('/', async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ createdAt: 1 });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics by month
router.get('/:month', async (req, res) => {
  try {
    const analytics = await Analytics.findOne({ month: req.params.month });
    if (!analytics) {
      return res.status(404).json({ error: 'Month not found' });
    }
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create analytics record
router.post('/', async (req, res) => {
  try {
    const analytics = await Analytics.create(req.body);
    res.status(201).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update analytics record
router.put('/:id', async (req, res) => {
  try {
    const analytics = await Analytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
