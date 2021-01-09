const config = require('config');

module.exports.errorsResponse = (error, req, res) => {
  res.status(error.status || config.get('default')).send({
    ...error,
  });
};
