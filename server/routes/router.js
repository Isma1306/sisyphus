const { Router } = require('express');
const { checkLoggedIn } = require('../middlewares/auth.middleware');
const {
  createUser,
  login,
  logout,
  getUser,
} = require('../controllers/user.controller');

const { createRoutine, getRoutinesByUser, deleteRoutine, updateRoutine } = require('../controllers/routine.controller');
const {
  signInValidator,
  signInConfig,
  logInConfig,
  logInValidator,
} = require('../middlewares/validators.middleware');

const router = new Router();

// users
router.post('/', signInConfig, signInValidator, createUser);
// router.post('/login', logInConfig, logInValidator, login);
// router.get('/login', getUser);
// router.post('/logout', checkLoggedIn, logout);

// routine
router.post('/routine', createRoutine);
router.put('/routine',  updateRoutine);
router.delete('/routine', deleteRoutine);
router.get('/routine', getRoutinesByUser);

module.exports = {
  router,
};
