const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // страна
  country: {
    type: String,
    required: true,
  },
  // режисер
  director: {
    type: String,
    required: true,
  },
  // длительность
  duration: {
    type: String,
    required: true,
  },
  // год выпуска
  year: {
    type: String,
    required: true,
  },
  // описание
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
      message: 'Некорректная ссылка',
    },
  },
  // ссылка на трейлер
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
      message: 'Некорректная ссылка',
    },
  },
  // миниатюрное изображение постера
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
      message: 'Некорректная ссылка',
    },
  },
  // _id пользователя, который сохранил фильм
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true,
  // },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: Number,
    required: true,
  },
  // название фильма на русском
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
