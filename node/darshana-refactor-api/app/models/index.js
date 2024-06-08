require('dotenv').config()
const fs = require('fs')
const path = require('path')
const SequelizeData = require('sequelize')
const basename = path.basename(__filename)
const config = require(path.join(
  __dirname,
  '/../../database/config.sequelize.js',
))
const db = {}

const sequelize = new SequelizeData(
  config.database,
  config.username,
  config.password,
  config,
)

// const rot = path.join(__dirname, "/jobBoard.js");
// const model = require(rot)(sequelize, SequelizeData.DataTypes);

// const model = require(rot)(sequelize, SequelizeData.DataTypes);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.includes('sequelize')
    )
  })
  .forEach((file) => {
    const pathFile = require(path.join(__dirname, file))

    const model = pathFile(sequelize, SequelizeData.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = SequelizeData

module.exports = db
