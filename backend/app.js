const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { errorsResponse } = require('./middlewares/errors.js');
const routerAuth = require('./routes/auth.js');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const routerError = require('./routes/error.js');

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routerAuth);
app.use(routerUsers);
app.use(routerCards);
app.use(routerError);

app.use(errorLogger); // log ошибок
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(res);
  }
  return next(error);
});
app.use(errors()); // ошибки celebrate
app.use(errorsResponse);

module.exports = app;
