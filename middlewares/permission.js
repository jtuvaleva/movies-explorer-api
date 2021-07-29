const CastError = require('../errors/cast-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');

module.exports = {
  checkPermission(req, res, next) {
    Movie.findById(req.params.movieId)
      .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
      .then((film) => {
        if (!film.owner.equals(req.user._id)) {
          throw new ForbiddenError('Нет прав на удаление');
        } else {
          next();
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new CastError('Невалидный id'));
        } else {
          next(err);
        }
      });
  },
};
