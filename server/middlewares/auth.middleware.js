// const { findUserById } = require('../models/user.model');

const checkLoggedIn = async function (req, res, next) {
  if (req.session.uid) next();
  else {
    res.status(401);
    res.send({ error: 'you are not logged in!', data: null });
  }
};

module.exports = { checkLoggedIn };
