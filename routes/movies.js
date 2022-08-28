const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexURL = require('../utils/constants');

const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле данными

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexURL),
    trailerLink: Joi.string().required().pattern(regexURL),
    thumbnail: Joi.string().required().pattern(regexURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovies);

// удаляет сохранённый фильм по id
router.delete('/:movieId', deleteMovies);

module.exports = router;
