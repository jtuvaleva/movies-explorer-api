const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const DuplicatedIdError = require('../errors/duplicated-id-err');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const filteredBody = {};

  if (name) {
    filteredBody.name = name;
  }

  if (email) {
    filteredBody.email = email;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { $set: filteredBody },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new DuplicatedIdError('Пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );

      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(new AuthError(err.message));
      } else {
        next(err);
      }
    });
};
