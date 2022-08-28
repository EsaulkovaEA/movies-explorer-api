const Movie = require('../models/movie');
const BadRequestError = require('../error/BadRequestError');
const NotFoundError = require('../error/NotFoundError');
const ForbiddenError = require('../error/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    // .then((movies) => res.send({movies}))
    .catch(next);
};
module.exports.createMovies = (req, res, next) => {
  // const owner = req.user._id;
  // console.log(owner);
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    // owner,
  })
    .then((movie) => res.send(movie))
    // .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные карточки'));
      }
      return next(err);
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then((movieId) => res.send({ movieId })).catch(next);
      }
      return next(new ForbiddenError('Недостаточно прав'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные карточки'));
      }
      return next(err);
    });
};
