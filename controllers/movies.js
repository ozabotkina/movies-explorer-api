const Movie = require('../models/movie');
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const Prohibited = require('../utils/errors/Prohibited');

module.exports.getMyMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return next(new BadRequest()); }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .then((movie) => {
      if (!movie) { throw new NotFound(); }
      if (movie.owner.toString() !== req.user._id._id) { throw new Prohibited(); }
      return (movie);
    })
    .then((movie) => {
      Movie.deleteOne({ _id: movie._id })
        .then((result) => res.send(result));
    })
    .catch((err) => {
      if (err.name === 'CastError') { return next(new BadRequest()); }
      return next(err);
    });
};
