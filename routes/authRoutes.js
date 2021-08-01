const { Router } = require('express');
const router = Router();

const { signup_get } = require('../controllers/authControllers');

router.get('/signup', signup_get);

module.exports = router;
