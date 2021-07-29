const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  max: 300,
});

module.exports = {
  rateLimiter,
};
