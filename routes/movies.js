const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regex = require('../utils/constants');

const { getMyMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMyMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().uri().pattern(regex).required(),
      trailerLink: Joi.string().uri().pattern(regex).required(),
      thumbnail: Joi.string().uri().pattern(regex).required(),
      // нужно ли сделать уникальным? Зачем сохранять два раза один и тот же фильм?
      movieId: Joi.string().alphanum().length(24).hex()
        .required(),
      // добавить валидацию языка
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);

router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().alphanum().length(24).hex()
        .required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
