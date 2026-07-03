const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema(
  {
    strategyName: {
      type: String,
      required: [true, 'Strategy name is required'],
      trim: true,
    },
    serviceName: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    communicationType: {
      type: String,
      required: [true, 'Communication type is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    owner: {
      type: String,
      required: [true, 'Owner is required'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Planned', 'Active', 'Deprecated'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Planned',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Strategy', strategySchema);
