const db = require('../../models/db');

const readRoutines = async (userId) => { // Works
  try {
    return await db.Routine.findAll({
      where: {
        UserId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const writeRoutine = async (routine, userId) => {  // Works
  try {
    return await db.Routine.create({
      routineName: routine.routineName,
      days: routine.days,
      UserId: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRoutines = async (routine, userId) => {
  // Test me
  // should update single routine where foreign key matches userId and routineName matches
  try {
    return await db.Routine.update(
      { routineName: routine.routineName, days: routine.days },
      {
        where: {
          // id: routine.id,
          UserId: userId
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const destroyRoutine = async (routine, userId) => {
  // WORKS
  // should destory routine where foreign key matches userId and where routineName matches. Should also destroy all associated exercises OR Create destroy all exercise query? Not sure if you can link
  try {
    return await db.Routine.destroy({
      where: {
        id: routine.id,
        UserId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { writeRoutine, readRoutines, updateRoutines, destroyRoutine };
