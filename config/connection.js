const Sequelize = require('sequelize');
require('dotenv').config();

// let sequelize;

// **** This is for Heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 8080
    }
  );
}

module.exports = sequelize;


