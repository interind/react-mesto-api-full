const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regHttp, regProfile } = require('../utils/reg.ext');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile),
      about: Joi.string().min(2).max(30).regex(regProfile),
      avatar: Joi.string().regex(regHttp),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }).unknown(),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().message('ошибка пароля или почты'),
      password: Joi.string().required().min(6).message('ошибка пароля или почты'),
    }),
  }),
  login,
);

module.exports = router;
