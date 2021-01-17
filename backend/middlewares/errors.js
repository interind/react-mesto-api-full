const config = require('config');

module.exports.errorsResponse = (error, req, res, next) => {
  if (config.has(error.name)) {
    res.status(config.get(error.name)).send({
      message: error.message,
    }).setHeader('Content-Type', 'application/json');
  }
  res.status(error.status || config.get('default')).send({
    message: error.message,
  }).setHeader('Content-Type', 'application/json');
  next(error);
};
