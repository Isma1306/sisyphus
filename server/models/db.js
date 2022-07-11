const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'db.js') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
