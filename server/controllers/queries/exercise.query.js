const db = require('../../models/db');

const writeExercise = async (exercise, routineId) => {
  try {
    await db.Exercise.create({
      exerciseName: exercise.name,
      reps: exercise.reps,
      sets: exercise.sets,
      isWeighted: exercise.isWeighted,
      isTimed: exercise.isTimed,
      RoutineId: routineId,
    });
  } catch (error) {
    console.log(error);
  }
};

const readExercises = async (RoutineId) => {
  try {
    await db.Exercise.findAll({
      where: {
        RoutineId: RoutineId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateExercise = async (exercise, routineId) => {
  try {
    await db.Exercise.update(exercise, {
      where: {
        RoutineId: routineId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  //should update and return single exercise where routineId matches foreign key and exercise name matches
};

const destroyExercise = async (routineId, exercise) => {
  try {
    await db.Exercise.destroy({
      where: {
        exerciseName: exercise.name,
        RoutineId: routineId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  //should destroy single exercise where routineId matches foreign key and exercise name matches
};

module.exports = {
  writeExercise,
  readExercises,
  updateExercise,
  destroyExercise,
};
