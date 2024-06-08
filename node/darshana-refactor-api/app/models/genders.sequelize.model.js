'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes

  class GendersModel extends Model {}

  GendersModel.init(
    {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name_en: { type: STRING },
      name_es: { type: STRING },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'genders',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return GendersModel
}
