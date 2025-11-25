// /models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Quote', quoteSchema);
