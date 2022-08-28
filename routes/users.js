const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserProfile, updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserProfile);
// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30),
  },
}), updateProfile);

module.exports = router;
