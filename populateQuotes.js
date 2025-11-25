require('dotenv').config();
const mongoose = require('mongoose');
const Quote = require('./models/Quotes');
const quotes = require('./utils/quotes'); // new


const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  await Quote.deleteMany({}); // clear old quotes
  console.log('Old quotes cleared');

  const quoteDocs = quotes.map(text => ({ text }));
  await Quote.insertMany(quoteDocs);
  console.log('50,000 quotes inserted successfully');

  process.exit(0);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});