'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { STRING } = DataTypes

  class SequelizeDataModel extends Model {}

  SequelizeDataModel.init(
    {
      name: { type: STRING },
    },
    {
      sequelize,
      modelName: 'sequelize_data',
    },
  )

  return SequelizeDataModel
}
