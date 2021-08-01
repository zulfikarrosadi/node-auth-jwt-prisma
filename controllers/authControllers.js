const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleError = (error) => {
  const errorMessage = {
    email: '',
    password: '',
  };

  // check email unique constraint violation
  if (error.code === 'P2002') {
    errorMessage.email =
      'This email is already in use. Please choose another one';
    return errorMessage;
  }

  // check any validation error
  if (error.errors.length > 0) {
    error.errors.forEach((e) => {
      errorMessage[e.param] = e.msg;
    });
  }
  return errorMessage;
};

const createToken = (id) => {
  const HALF_DAY_IN_SECOND = 60 * 60 * 12;
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: HALF_DAY_IN_SECOND,
  });
};

const signup_get = (req, res) => res.render('signup');

const signup_post = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw errors;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });
    const token = createToken(user.id);

    res.cookie('jerawat', token, {
      sameSite: 'lax',
      httpOnly: true,
    });
    return res.status(201).json({ user: user.id });
  } catch (error) {
    const errors = handleError(error);
    return res.status(400).json({ errors });
  }
};

module.exports = { signup_get, signup_post };
