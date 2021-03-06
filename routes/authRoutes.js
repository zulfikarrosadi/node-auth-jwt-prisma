const { Router } = require('express');
const router = Router();

const authValidation = require('../const/authValidation');

const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
} = require('../controllers/authControllers');

router.get('/signup', signup_get);
router.get('/login', login_get);
router.post('/signup', authValidation, signup_post);
router.post('/login', authValidation, login_post);
router.get('/logout', logout_get);

module.exports = router;
