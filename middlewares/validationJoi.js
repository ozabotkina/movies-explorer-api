const { celebrate, Joi } = require('celebrate');
const regex = require('../utils/constants');

const createUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const addMovieVal = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().pattern(regex).required(),
    trailerLink: Joi.string().uri().pattern(regex).required(),
    thumbnail: Joi.string().uri().pattern(regex).required(),
    movieId: Joi.number().required(),
    // добавить валидацию языка? но в русском названии могут быть латинские символы и наоборот
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex()
      .required(),
  }),
});

const updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  createUserVal, loginVal, addMovieVal, deleteMovieVal, updateUserVal,
};
