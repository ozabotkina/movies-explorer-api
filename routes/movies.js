const router = require('express').Router();

const { getMyMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieVal, deleteMovieVal } = require('../middlewares/validationJoi');

router.get('/', getMyMovies);

router.post(
  '/',
  addMovieVal,
  addMovie,
);

router.delete(
  '/:_id',
  deleteMovieVal,
  deleteMovie,
);

module.exports = router;
