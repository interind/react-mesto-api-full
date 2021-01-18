/* eslint-disable func-names */
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
      message: 'Ошибка в ссылке Аватара',
    },
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

userSchema.statics.findUserByCredentials = async function (email, password, next) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(createError(config.get('Unauthorized'), 'Неправильные почта или пароль'));
    }
    try {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(createError(config.get('Unauthorized'), 'Неправильные почта или пароль'));
      }
      return user;
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('user', userSchema);
