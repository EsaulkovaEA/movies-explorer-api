const router = require('express').Router();
const { validationCreateMovies, validationDeleteMovies } = require('../middlewares/validation');

const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле данными

router.post('/', validationCreateMovies, createMovies);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validationDeleteMovies, deleteMovies);

module.exports = router;
