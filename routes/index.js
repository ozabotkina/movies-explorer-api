const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerEntrance = require('./entrance');
const tokenAuth = require('../middlewares/auth');
const NotFound = require('../utils/errors/NotFound');

router.use('/', routerEntrance);
router.use('/movies', tokenAuth, routerMovies);
router.use('/users', tokenAuth, routerUsers);
router.use('/*', tokenAuth, () => {
  throw new NotFound();
});

module.exports = router;
