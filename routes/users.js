const router = require('express').Router();
const { currentUser, updateUser } = require('../controllers/users');
const { updateUserVal } = require('../middlewares/validationJoi');

router.get('/me', currentUser);

router.patch(
  '/me',
  updateUserVal,
  updateUser,
);

module.exports = router;
