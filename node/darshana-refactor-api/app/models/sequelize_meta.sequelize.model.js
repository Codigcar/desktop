'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { STRING } = DataTypes

  class SequelizeMetaModel extends Model {}

  SequelizeMetaModel.init(
    {
      name: { type: STRING },
    },
    {
      sequelize,
      modelName: 'sequelize_meta',
    },
  )

  return SequelizeMetaModel
}
