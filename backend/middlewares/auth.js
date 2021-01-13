const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const config = require('config');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new createError.Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'development' ? JWT_SECRET : config.get('secretKey'));
  } catch (err) {
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
  return true;
};
