const { Router } = require('express');
const router = Router();

const authValidation = require('../middlewares/authValidation');

const { signup_get, signup_post } = require('../controllers/authControllers');

router.get('/signup', signup_get);
router.post('/signup', authValidation, signup_post);

module.exports = router;
