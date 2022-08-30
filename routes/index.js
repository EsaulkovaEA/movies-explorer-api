const route = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { signIn, signUp } = require('../middlewares/validation');

route.use('/users', auth, users);
route.use('/movies', auth, movies);

route.post('/signin', signIn, login);
route.post('/signup', signUp, createUser);

module.exports = route;
