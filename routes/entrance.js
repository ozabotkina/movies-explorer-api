const router = require('express').Router();
const { createUser, login, signout } = require('../controllers/users');
const { createUserVal, loginVal } = require('../middlewares/validationJoi');

router.post(
  '/signup',
  createUserVal,
  createUser,
);

router.post(
  '/signin',
  loginVal,
  login,
);

router.post('/signout', signout);

module.exports = router;
