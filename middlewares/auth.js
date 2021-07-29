const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { authReqMssg } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(authReqMssg);
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new AuthError(authReqMssg));
    }

    req.user = payload;

    next();
  }
};
