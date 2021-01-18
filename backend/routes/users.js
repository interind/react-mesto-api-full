const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regHttp } = require('../utils/reg.ext');
const auth = require('../middlewares/auth.js');
const {
  getUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users.js');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUser);
router.get('/users/:userId', auth, getUserId);
router.patch('/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }), updateUser);

router.patch('/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regHttp).required(),
    }),
  }), updateUserAvatar);

module.exports = router;
