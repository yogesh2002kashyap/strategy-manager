const express = require('express');
const router = express.Router();
const {
  getStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
  deleteStrategy,
} = require('../controllers/strategyController');

router.route('/').get(getStrategies).post(createStrategy);
router.route('/:id').get(getStrategyById).put(updateStrategy).delete(deleteStrategy);

// Catch-all 404 for unknown routes under /api/strategies
router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found in strategy routes' });
});

module.exports = router;
