const router = require('express').Router();
const { validationUpdateProfile } = require('../middlewares/validation');

const {
  getUserProfile, updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserProfile);
// обновляет информацию о пользователе (email и имя)
router.patch('/me', validationUpdateProfile, updateProfile);

module.exports = router;
