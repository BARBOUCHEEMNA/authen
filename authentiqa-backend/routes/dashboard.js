const express = require('express');
const router = express.Router();
const DashboardStats = require('../models/DashboardStats');

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    let stats = await DashboardStats.findOne();
    if (!stats) {
      stats = await DashboardStats.create({});
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update dashboard stats
router.put('/stats', async (req, res) => {
  try {
    const stats = await DashboardStats.findOneAndUpdate({}, req.body, { new: true });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
