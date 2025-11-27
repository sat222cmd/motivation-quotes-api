require('dotenv').config(); // fixed typo from 'reqdotenv'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const motivationRouter = require('./api/motivationRoute'); // correct relative path

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/motivation-quotes-api';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/motivation', motivationRouter); // keeps your original route

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Motivation Quotes API is running.' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
