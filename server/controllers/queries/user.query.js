const db = require('../../models/db');

const writeUser = async (user) => {
  try {
    return await db.User.create({
      email: user.email,
      name: user.name,
      password: user.password,
    });
  } catch (error) {
    console.log(error);
  }
};

const readUser = async (id) => {
  // should return: user details where id matches, associated routines and associated exercises for those routines
};

module.exports = { writeUser, readUser };
