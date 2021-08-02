const { Router } = require('express');
const router = Router();

const authValidation = require('../const/authValidation');

const {
  signup_get,
  signup_post,
  login_get,
  login_post,
} = require('../controllers/authControllers');

router.get('/signup', signup_get);
router.get('/login', login_get);
router.post('/signup', authValidation, signup_post);
router.post('/login', authValidation, login_post);

module.exports = router;
