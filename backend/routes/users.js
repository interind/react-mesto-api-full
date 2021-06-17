const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regHttp, regProfile } = require('../utils/reg.ext');
const auth = require('../middlewares/auth');
const {
  getUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUser);
router.get('/users/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }), getUserId);
router.patch('/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      about: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
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
