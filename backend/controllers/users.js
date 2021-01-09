const { NODE_ENV, JWT_SECRET } = process.env;
const config = require('config');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : config.get('secretKey'),
        {
          expiresIn: '7d',
        },
      );
      res.send({ token, _id: user._id });
    })
    .catch((err) => next(createError(config.get('unAuthorized'), err.message)));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw createError(config.get('doNotFind'), 'Такого пользователя нет!❌');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(createError(config.get('badRequest'), 'Ошибка id пользователя!❌'));
      }
      return next(createError(config.get('default'), err.message));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body; // нужно хэшировать пароль.

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};
