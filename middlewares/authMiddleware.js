const { verify } = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jerawat;
  if (token) {
    verify(token, process.env.SECRET_KEY, (err) => {
      if (err) res.redirect('/login');

      next();
    });
  }
  return res.redirect('/login');
};

module.exports = requireAuth;
