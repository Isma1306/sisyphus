const { writeExercise } = require('./queries/exercise.query');
const { writeRoutine, readRoutines, destroyRoutine, updateRoutines } = require('./queries/routine.query');

const createRoutine = async function (req, res) {  // Works
  const userId = 1;
  const routine = req.body;
  try {
    const newRoutine = await writeRoutine(routine, userId);
    routine.exercises.map((exercise) => {
      writeExercise(exercise, newRoutine.id);
    });
    res.status(201);
    res.send({ error: null, data: newRoutine });
  } catch (error) {
    res.status(400);
    res.send({
      error: 'Error creating routine, please try again.',
      data: null,
    });
    console.log('error :>> ', error);
  }
};
const deleteRoutine = async function (req, res) {
  // WORKS
  const userId = 1;
  // req.session.uid;
  const routine = req.body;
  try {
    const routines = await destroyRoutine(routine, userId);
    res.status(202);
    res.send({ error: null, data: routines });
  } catch (error) {
    res.status(400);
    res.send({
      error: 'Error deleting routine, please try again.',
      data: null,
    });
    console.log('error :>> ', error);
  }
};
const updateRoutine = async function (req, res) {
  // Test me
  const routine = req.body;
  const userId = 1;
  // req.session.uid
  try {
    const newRoutines = await updateRoutines(routine, userId);
    res.status(201);
    res.send({ error: null, data: newRoutines });
  } catch (error) {
    res.status(400);
    res.send({
      error: 'Error updating routine, please try again.',
      data: null,
    });
    console.log('error :>> ', error);
  }
};
const getRoutinesByUser = async function (req, res) { // Works
  const userId = 1
  // req.session.uid;
  try {
    const routines = await readRoutines(userId);
    res.status(200);
    res.send({ error: null, data: routines });
  } catch (error) {
    res.status(400);
    res.send({
      error: 'Error fetching routines, please try again.',
      data: null,
    });
    console.log('error :>> ', error);
  }
};

module.exports = {
  createRoutine,
  deleteRoutine,
  updateRoutine,
  getRoutinesByUser,
};
