const { body } = require('express-validator');
const authValidation = [
  body('email').isEmail().withMessage('This is not valid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Your password should be more than 5 characters'),
];

module.exports = authValidation;
