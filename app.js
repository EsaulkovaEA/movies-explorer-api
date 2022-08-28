const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { signIn, signUp } = require('./middlewares/validation');
const users = require('./routes/users');
const movies = require('./routes/movies');

const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const NotFoundError = require('./error/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', { useNewUrlParser: true });
app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use('/users', auth, users);
app.use('/movies', auth, movies);

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);

// запрос к несуществуюшему роуту
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Данной страницы не существует'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode).send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
