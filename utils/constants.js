const dbName = 'moviesdb';
const serverUrl = 'localhost:27017';
const mongoParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// error message
const badRequestErrorMssg = 'Неверные данные';
const badRequestAddFilmMssg = 'Переданы некорректные данные при добавлении фильма';
const badRequestUpdateProfileMssg = 'Переданы некорректные данные при обновлении профиля';
const duplicatedIdErrorMsg = 'Пользователь уже существует';
const authErrorMssg = 'Неправильные почта или пароль';
const authReqMssg = 'Необходима авторизация';
const notFoundUserMssg = 'Запрашиваемый пользователь не найден';
const notFoundFilmMssg = 'Фильм с указанным id не найден';
const badRouterMssg = 'Неверный роутер, страница не найдена';
const castErrorMssg = 'Невалидный id';
const forbiddenErrorMssg = 'Нет прав на удаление';

// success message
const deleteSuccessMssg = 'Карточка с фильмом удалена';

module.exports = {
  serverUrl,
  dbName,
  mongoParams,
  badRouterMssg,
  badRequestErrorMssg,
  badRequestAddFilmMssg,
  badRequestUpdateProfileMssg,
  duplicatedIdErrorMsg,
  notFoundUserMssg,
  notFoundFilmMssg,
  authErrorMssg,
  authReqMssg,
  castErrorMssg,
  deleteSuccessMssg,
  forbiddenErrorMssg,
};
