const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  apiKey: { type: String, required: true, unique: true },
  tier: {
    type: String,
    enum: ['free', 'pro'],
    default: 'free',
    required: true,
  },
  usage: {
    count: { type: Number, default: 0 },
    lastReset: { type: Date, default: new Date() },
  },
});

module.exports = mongoose.model('User', userSchema);
