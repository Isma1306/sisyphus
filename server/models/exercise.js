module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exerciseName: DataTypes.STRING,
    reps: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    isWeighted: DataTypes.BOOLEAN,
    isTimed: DataTypes.BOOLEAN,
  });
  return Exercise;
};
