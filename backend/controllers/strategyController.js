const asyncHandler = require('../utils/asyncHandler');
const Strategy = require('../models/Strategy');
const xss = require('xss');

// @desc    Get all strategies
// @route   GET /api/strategies
// @access  Public
const getStrategies = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not Implemented: getStrategies' });
});

// @desc    Get strategy by ID
// @route   GET /api/strategies/:id
// @access  Public
const getStrategyById = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not Implemented: getStrategyById' });
});

// @desc    Create a strategy
// @route   POST /api/strategies
// @access  Public
const createStrategy = asyncHandler(async (req, res) => {
  const {
    strategyName,
    serviceName,
    communicationType,
    description,
    owner,
    status,
  } = req.body;

  if (!strategyName || !serviceName || !communicationType || !description || !owner) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const sanitizedData = {
    strategyName: xss(strategyName),
    serviceName: xss(serviceName),
    communicationType: xss(communicationType),
    description: xss(description),
    owner: xss(owner),
    status: status ? xss(status) : 'Planned',
  };

  const strategy = await Strategy.create(sanitizedData);

  console.log('[Analytics] User interacted with Microservice Decoupling Strategy');

  res.status(201).json(strategy);
});

// @desc    Update a strategy
// @route   PUT /api/strategies/:id
// @access  Public
const updateStrategy = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not Implemented: updateStrategy' });
});

// @desc    Delete a strategy
// @route   DELETE /api/strategies/:id
// @access  Public
const deleteStrategy = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not Implemented: deleteStrategy' });
});

module.exports = {
  getStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
  deleteStrategy,
};
