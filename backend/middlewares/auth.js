const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const config = require('config');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    if (!token) {
      next(createError.Unauthorized(config.get('errorToken')));
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.get('secretKey'));
  } catch (err) {
    next(createError.Unauthorized(err.message));
  }

  req.user = payload;

  next();
  return true;
};
