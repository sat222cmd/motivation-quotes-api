const DAY_IN_MS = 24 * 60 * 60 * 1000;

const limits = {
  free: 50,
  pro: 10000,
};

async function rateLimiter(req, res, next) {
  try {
    const user = req.user;
    const now = Date.now();

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Reset usage count if last reset was more than 24hrs ago
    if (!user.usage.lastReset || (now - new Date(user.usage.lastReset).getTime()) > DAY_IN_MS) {
      user.usage.count = 0;
      user.usage.lastReset = new Date(now);
    }

    const userLimit = limits[user.tier] || limits.free;

    if (user.usage.count >= userLimit) {
      return res.status(429).json({ error: 'Daily request limit reached.' });
    }

    // Increment usage
    user.usage.count += 1;
    await user.save();

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = rateLimiter;
