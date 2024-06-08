'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, BOOLEAN, STRING, DATE } = DataTypes

  class ProjectStatusModel extends Model {}

  ProjectStatusModel.init(
    {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING },
      visible: { type: BOOLEAN },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'project_statuses',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return ProjectStatusModel
}
