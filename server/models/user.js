module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: DataTypes.TEXT,
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
  });
  User.associate = (db) => {
    User.hasMany(db.Routine);
  };

  return User;
};
