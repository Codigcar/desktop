'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { UUID, DATE, UUIDV4 } = DataTypes

  class ApiKeysModel extends Model {
    // static associate(models) {
    // }
  }

  ApiKeysModel.init(
    {
      uuid: { type: UUID, defaultValue: UUIDV4, primaryKey: true },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'api_keys',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return ApiKeysModel
}
