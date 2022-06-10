const { Router } = require('express');
const { checkLoggedIn, checkIsUser } = require('../middlewares/auth.middleware');
const { createUser, login, logout } = require('../controllers/user.controller');
const { createExercise, deleteExercise, updateExercise, getExercisesByUser } = require('../controllers/exercise.controller');
const { createRoutine, deleteRoutine, updateRoutine, getRoutinesByUser } = require('../controllers/routine.controller');
const { createSet, deleteSet, updateSet, getSetsByDay } = require('../controllers/set.controller');
const { signInValidator, signInConfig, logInConfig, logInValidator } = require('../middlewares/validators.middleware');

const router = new Router();

// users
router.post('/', signInConfig, signInValidator, createUser);
router.post('/login', logInConfig, logInValidator, login);
router.post('/logout', checkLoggedIn, logout);

// exercises
router.post('/:userId/exercise', checkLoggedIn, checkIsUser, createExercise);
router.delete('/:userId/exercise/:id', checkLoggedIn, checkIsUser, deleteExercise);
router.put('/:userId/exercise/:id', checkLoggedIn, checkIsUser, updateExercise);
router.get('/:userId/exercise/', checkLoggedIn, checkIsUser, getExercisesByUser);

// routine
router.post('/:userId/routine', checkLoggedIn, checkIsUser, createRoutine);
router.delete('/:userId/routine/:id', checkLoggedIn, checkIsUser, deleteRoutine);
router.put('/:userId/routine/:id', checkLoggedIn, checkIsUser, updateRoutine);
router.get('/:userId/routine/', checkLoggedIn, checkIsUser, getRoutinesByUser);

// sets
router.post('/:userId/set', checkLoggedIn, checkIsUser, createSet);
router.delete('/:userId/set/:id', checkLoggedIn, checkIsUser, deleteSet);
router.put('/:userId/set/:id', checkLoggedIn, checkIsUser, updateSet);
router.get('/:userId/set/', checkLoggedIn, checkIsUser, getSetsByDay);


module.exports = {
  router
};