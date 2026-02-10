const express = require('express');
const router = express.Router();
const FraudDetection = require('../models/FraudDetection');

// Get all fraud detection types
router.get('/', async (req, res) => {
  try {
    const fraudData = await FraudDetection.find();
    res.json(fraudData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fraud detection by type
router.get('/:type', async (req, res) => {
  try {
    const fraud = await FraudDetection.findOne({ type: req.params.type });
    if (!fraud) {
      return res.status(404).json({ error: 'Fraud type not found' });
    }
    res.json(fraud);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create fraud detection record
router.post('/', async (req, res) => {
  try {
    const fraud = await FraudDetection.create(req.body);
    res.status(201).json(fraud);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update fraud detection record
router.put('/:id', async (req, res) => {
  try {
    const fraud = await FraudDetection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fraud);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
