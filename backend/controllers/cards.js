const createError = require('http-errors');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({}).select('-__v')
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;

  const {
    name, link,
  } = req.body;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if ((!card)) {
        return Promise.reject(createError.NotFound('Такой карточки нет'));
      } if (card.owner.toString() !== req.user._id) {
        return Promise.reject(createError.Forbidden('Ошибка прав доступа'));
      }
      card.remove();
      return res.send({ message: 'карточка удалена' });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return Promise.reject(createError.NotFound('такой карточки нет'));
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return Promise.reject(createError.NotFound('такой карточки нет'));
    })
    .catch(next);
};
