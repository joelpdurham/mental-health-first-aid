const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

function attachCookie(res, token) {
  res.cookie('session', token, {
    maxAge: 24 * 60 * 60 * 1000
  });
}

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        attachCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  });