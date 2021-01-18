const router = require('express').Router();
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
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
