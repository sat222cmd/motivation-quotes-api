// middleware/auth/apiKeyAuth.js
module.exports = (req, res, next) => {
  const key = req.header('x-api-key');
  if (!key) return res.status(401).json({ error: 'API key missing' });
  // Unlimited: accept any key
  next();
};
