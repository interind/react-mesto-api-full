const router = require('express').Router();
const config = require('config');
const createError = require('http-errors');

router.get('*', (req, res, next) => next(
  createError(config.get('doNotFind'), 'Запрашиваемый ресурс не найден'),
));

module.exports = router;
