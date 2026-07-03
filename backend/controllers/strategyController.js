
const asyncHandler = require('../utils/asyncHandler');
const Strategy = require('../models/Strategy');
const mongoose = require('mongoose');
const xss = require('xss');

const STRATEGY_TEXT_FIELDS = [
  'strategyName',
  'serviceName',
  'communicationType',
  'description',
  'owner',
];
const STRATEGY_STATUS_VALUES = ['Planned', 'Active', 'Deprecated'];
const STRATEGY_UPDATE_FIELDS = [...STRATEGY_TEXT_FIELDS, 'status'];
const sanitizeStrategyUpdateValue = (value) => xss(value.trim(), {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script'],
});

const buildStrategyUpdateData = (payload) => {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return {
      error: 'Request body must be a JSON object',
    };
  }

  const updateData = {};
  const invalidFields = Object.keys(payload).filter(
    (field) => !STRATEGY_UPDATE_FIELDS.includes(field)
  );

  if (invalidFields.length > 0) {
    return {
      error: `Invalid update field(s): ${invalidFields.join(', ')}`,
    };
  }

  STRATEGY_UPDATE_FIELDS.forEach((field) => {
    if (payload[field] === undefined) {
      return;
    }

    if (typeof payload[field] !== 'string' || payload[field].trim() === '') {
      updateData.error = `${field} must be a non-empty string`;
      return;
    }

    updateData[field] = sanitizeStrategyUpdateValue(payload[field]);
  });

  if (updateData.error) {
    return { error: updateData.error };
  }

  if (updateData.status && !STRATEGY_STATUS_VALUES.includes(updateData.status)) {
    return {
      error: `${updateData.status} is not a valid status`,
    };
  }

  if (Object.keys(updateData).length === 0) {
    return {
      error: 'Please provide at least one field to update',
    };
  }

  return { updateData };
};

// @desc    Get all strategies
// @route   GET /api/strategies
// @access  Public
const getStrategies = asyncHandler(async (req, res) => {
  const strategies = await Strategy.find({}).sort({ createdAt: -1 });
  res.status(200).json(strategies);
});

// @desc    Get strategy by ID
// @route   GET /api/strategies/:id
// @access  Public
const getStrategyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ message: 'Invalid strategy ID' });
  }

  const strategy = await Strategy.findById(id);

  if (!strategy) {
    return res.status(404).json({ message: 'Strategy not found' });
  }

  return res.status(200).json(strategy);
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
  const { id } = req.params;

  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ message: 'Invalid strategy ID' });
  }

  const { updateData, error } = buildStrategyUpdateData(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const strategy = await Strategy.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!strategy) {
    return res.status(404).json({ message: 'Strategy not found' });
  }

  console.log('[Analytics] User interacted with Microservice Decoupling Strategy');

  return res.status(200).json(strategy);
});

// @desc    Delete a strategy
// @route   DELETE /api/strategies/:id
// @access  Public
const deleteStrategy = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ message: 'Invalid strategy ID' });
  }

  const strategy = await Strategy.findByIdAndDelete(id);

  if (!strategy) {
    return res.status(404).json({ message: 'Strategy not found' });
  }

  console.log('[Analytics] User interacted with Microservice Decoupling Strategy');

  return res.status(200).json({ message: 'Strategy deleted successfully' });
});

module.exports = {
  getStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
  deleteStrategy,
};
