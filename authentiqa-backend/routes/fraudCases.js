const express = require('express');
const router = express.Router();
const FraudCase = require('../models/FraudCase');

// Get all fraud cases
router.get('/', async (req, res) => {
  try {
    const cases = await FraudCase.find().sort({ detectedDate: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fraud case by ID
router.get('/:id', async (req, res) => {
  try {
    const fraudCase = await FraudCase.findById(req.params.id);
    if (!fraudCase) {
      return res.status(404).json({ error: 'Fraud case not found' });
    }
    res.json(fraudCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create fraud case
router.post('/', async (req, res) => {
  try {
    const fraudCase = await FraudCase.create(req.body);
    res.status(201).json(fraudCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update fraud case
router.put('/:id', async (req, res) => {
  try {
    const fraudCase = await FraudCase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fraudCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete fraud case
router.delete('/:id', async (req, res) => {
  try {
    await FraudCase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fraud case deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
