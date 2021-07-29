const CastError = require('../errors/cast-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');
const {
  notFoundFilmMssg, castErrorMssg, forbiddenErrorMssg,
} = require('../utils/constants');

module.exports = {
  checkPermission(req, res, next) {
    Movie.findById(req.params.movieId)
      .orFail(new NotFoundError(notFoundFilmMssg))
      .then((film) => {
        if (!film.owner.equals(req.user._id)) {
          throw new ForbiddenError(forbiddenErrorMssg);
        } else {
          next();
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new CastError(castErrorMssg));
        } else {
          next(err);
        }
      });
  },
};
