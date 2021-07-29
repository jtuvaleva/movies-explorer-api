const { celebrate, Joi } = require('celebrate');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required()
      .min(2)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.empty': 'Заполните необходимое поле name',
        'any.required': 'Заполните необходимое поле name',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Некорректный email',
        'string.empty': 'Заполните необходимое поле email',
        'any.required': 'Заполните необходимое поле email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Заполните необходимое поле password',
        'any.required': 'Заполните необходимое поле password',
      }),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Некорректный email',
        'string.empty': 'Заполните необходимое поле email',
        'any.required': 'Заполните необходимое поле email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Заполните необходимое поле password',
        'any.required': 'Заполните необходимое поле password',
      }),
  }),
});

module.exports.validateUpdateProfileEntry = celebrate({
  body: Joi.object().keys({
    name: Joi.string().not('')
      .messages({
        'any.invalid': 'Поле name должно быть заполненным',
      }),
    email: Joi.string().email()
      .messages({
        'string.email': 'Некорректный email',
        'string.empty': 'Поле email должно быть заполненным',
      }),
  }),
});

module.exports.validateMovieEntry = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': 'Поле country должно быть заполненным',
        'any.required': 'Поле country должно быть заполненным',
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': 'Поле director должно быть заполненным',
        'any.required': 'Поле director должно быть заполненным',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Поле duration должно быть числом',
        'number.empty': 'Поле duration должно быть заполненным',
        'any.required': 'Поле duration должно быть заполненным',
      }),
    year: Joi.string().required()
      .messages({
        'string.base': 'Поле year должно быть строкой',
        'string.empty': 'Поле year должно быть заполненным',
        'any.required': 'Поле year должно быть заполненным',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Описание должно быть заполнено',
        'any.required': 'Описание должно быть заполнено',
      }),
    image: Joi.string().required()
      .messages({
        'string.empty': 'Добавьте ссылку на постер',
        'any.required': 'Добавьте ссылку на постер',
      }),
    trailer: Joi.string().required()
      .messages({
        'string.empty': 'Добавьте ссылку на трейлер',
        'any.required': 'Добавьте ссылку на трейлер',
      }),
    thumbnail: Joi.string().required()
      .messages({
        'string.empty': 'Добавьте ссылку на изображение',
        'any.required': 'Добавьте ссылку на изображение',
      }),
    movieId: Joi.number().required()
      .messages({
        'string.empty': 'Поле должно быть заполненным',
        'any.required': 'Поле должно быть заполненным',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Добавьте название фильма на русском',
        'any.required': 'Добавьте название фильма на русском',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Добавьте название фильма на английском',
        'any.required': 'Добавьте название фильма на английском',
      }),
  }),
});
