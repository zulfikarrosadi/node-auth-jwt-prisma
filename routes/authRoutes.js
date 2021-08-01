const { Router } = require('express');
const router = Router();

const authValidation = require('../middlewares/authValidation');

const {
  signup_get,
  signup_post,
  login_get,
} = require('../controllers/authControllers');

router.get('/signup', signup_get);
router.get('/login', login_get);
router.post('/signup', authValidation, signup_post);

module.exports = router;
