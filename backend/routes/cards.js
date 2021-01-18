const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regHttp, regProfile } = require('../utils/reg.ext');
const auth = require('../middlewares/auth.js');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

router.get('/cards', auth, getCards);
router.post('/cards',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      link: Joi.string().regex(regHttp).required(),
    }),
  }), createCard);
router.delete('/cards/:cardId', auth, deleteCard);
router.put('/cards/:cardId/likes', auth, likeCard);
router.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = router;
