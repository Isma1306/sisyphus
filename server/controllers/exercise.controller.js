const createExercise = async (req, res) => {
  const exercise = req.body.exercise;
  try {
    const newExercise = await db.Exercise.create({
      exerciseName: exercise.name,
      reps: exercise.reps,
      sets: exercise.sets,
      isWeighted: exercise.isWeighted,
      isTimed: exercise.isTimed,
      RoutineId: exercise.routineId,
    }).catch((err) => console.log(err));
    res.status(201);
    res.send({ error: null, data: newExercise });
  } catch (error) {
    res.status(400);
    res.send({
      error: 'Error creating exercise please try again.',
      data: null,
    });
    console.log('error :>> ', error);
  }
};
