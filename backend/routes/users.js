const router = require('express').Router();
const auth = require('../middlewares/auth.js');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users.js');

router.get('/users', auth, getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
