module.exports = (sequelize, DataTypes) => {
  const Routine = sequelize.define('Routine', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    routineName: DataTypes.STRING,
    days: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: null },
  });
  Routine.associate = (db) => {
    Routine.hasMany(db.Exercise);
  };

  return Routine;
};

