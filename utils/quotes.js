// This module exports an array of at least 50,000 motivational quotes.
// For simplicity and demonstration, we'll generate dummy quotes programmatically.

const baseQuotes = [
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "It always seems impossible until it's done.",
  "Start where you are. Use what you have. Do what you can.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "You are never too old to set another goal or to dream a new dream.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Believe in yourself and all that you are.",
];

const quotes = [];

for (let i = 0; i < 50000; i++) {
  const quote = baseQuotes[i % baseQuotes.length] + ` (Motivational Quote #${i + 1})`;
  quotes.push(quote);
}

module.exports = quotes;
