const { verify } = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jerawat;
  if (token) {
    verify(token, process.env.SECRET_KEY, (err) => {
      if (err) return res.redirect('/login');
      return next();
    });
  }
  return res.redirect('/login');
};

module.exports = requireAuth;
