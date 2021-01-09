const router = require('express').Router();
const config = require('config');

router.get('*', (req, res) => {
  res.status(config.get('NotFound')).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
