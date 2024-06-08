'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes

  class TopicStatusModel extends Model {}

  TopicStatusModel.init(
    {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'topics',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return TopicStatusModel
}
