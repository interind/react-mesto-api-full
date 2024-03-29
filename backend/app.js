const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsResponse } = require('./middlewares/errors');
const routerAuth = require('./routes/auth');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerError = require('./routes/error');

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(routerAuth);
app.use(routerUsers);
app.use(routerCards);
app.use(routerError);

app.use(errorLogger); // log ошибок
app.use(errors());

app.use(errorsResponse);

module.exports = app;
