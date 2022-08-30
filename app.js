const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const route = require('./routes/index');

const auth = require('./middlewares/auth');

const { handleErrors } = require('./middlewares/handleErrors');

const NotFoundError = require('./error/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/moviesdb', { useNewUrlParser: true });
app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use(route);

// запрос к несуществуюшему роуту
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Данной страницы не существует'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
