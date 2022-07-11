const bcrypt = require('bcrypt');
const { writeUser, readUser } = require('./queries/user.query');
// const { findUser, findUserById } = require('../models/l');

const saltRounds = 10;

const createUser = (req, res) => {
  const user = req.body;
  bcrypt.hash(user.password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    try {
      user.password = hash;
      const newUser = await writeUser(user);
      req.session.regenerate(() => {
        return (req.session.uid = newUser.id);
      });
      delete newUser.password;
      delete newUser.id;
      res.status(201);
      res.send({ error: null, data: newUser });
    } catch (error) {
      if (error.meta?.target[0] === 'email') {
        res.status(409);
        res.send({ error: 'Email already in use.', data: null });
      } else {
        console.log(error);
        res.status(503);
        res.send();
      }
    }
  });
};

const getUser = async function (req, res) {
  // const id = req.session.uid;
  const id = req.body.id;
  try {
    const user = await readUser(id);
    res.status(200);
    res.send({ error: null, data: user });
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send({ error: 'You are not logged in.', data: null });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    res.send({ error: 'Missing password or email.', data: null });
  } else {
    const user = await findUser(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.regenerate(() => {
        req.session.uid = user.id;
        req.session.save(function (err) {
          if (err) return next(err);
          delete user.password;
          delete user.id;
          res.status(200);
          res.send({ error: null, data: user });
        });
      });
    } else {
      res.status(400);
      res.send({ error: 'wrong email or password.', data: null });
    }
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionId');
  res.status(200);
  res.send({ error: 'You are logged out.', data: null });
};

module.exports = {
  createUser,
  login,
  logout,
  getUser,
};
