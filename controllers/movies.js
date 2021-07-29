const BadRequestError = require('../errors/bad-request-err');
const CastError = require('../errors/cast-err');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');
const {
  badRequestAddFilmMssg, castErrorMssg,
  notFoundFilmMssg, deleteSuccessMssg,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((film) => res.send({ film }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestAddFilmMssg));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .orFail(new NotFoundError(notFoundFilmMssg))
    .then(() => {
      res.send({ message: deleteSuccessMssg });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(castErrorMssg));
      } else {
        next(err);
      }
    });
};
