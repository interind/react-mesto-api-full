const config = require('config');
const createError = require('http-errors');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(createError(config.get('default'), err.message)));
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
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        return res.send({ message: 'карточка удалена' });
      }
      throw createError(config.get('doNotFind'), 'такой карточки нет');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw createError(config.get('doNotFind'), 'такой карточки нет');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw createError(config.get('doNotFind'), 'такой карточки нет');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(createError(config.get('badRequest'), err.message));
      }
      return next(createError(config.get('default'), err.message));
    });
};
