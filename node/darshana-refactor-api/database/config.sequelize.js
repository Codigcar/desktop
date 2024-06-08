require('dotenv').config();

module.exports = {
  "host": process.env.DB_HOST,
  "database": process.env.DB_DATABASE,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "dialect": "mysql",
  "migrationStorageTableName": "sequelize_meta",
  "seederStorage": 'sequelize',
  "seederStorageTableName": 'sequelize_data'
};
