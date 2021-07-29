require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { createUser, login } = require('./controllers/users');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const { dbName, mongoParams } = require('./utils/constants');

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

const { PORT = 3000, SERVER_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${SERVER_URL}/${dbName}`, mongoParams);
    console.log('База данных MongoDB подключена');
  } catch (err) {
    console.log('Проблемы с подключением к MongoDB', err);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);
app.use(rateLimiter);

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Неверный роутер, страница не найдена');
});

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
