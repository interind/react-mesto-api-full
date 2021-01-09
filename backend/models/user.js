const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const config = require('config');
const isEmail = require('validator/lib/isEmail');
const { regHttp } = require('../utils/reg.ext.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: config.get('userName'),
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: config.get('userAbout'),
    required: true,
  },
  avatar: {
    type: String,
    default: config.get('avatar'),
    required: true,
    validate: {
      validator: (v) => regHttp.test(v),
    },
    message: 'Ошибка в ссылке Аватара',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(createError(config.get('Unauthorized'), 'Неправильные почта или пароль'));
        return false;
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(createError(config.get('Unauthorized'), 'Неправильные почта или пароль'));
          }
          console.log(user);
          return user;
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
