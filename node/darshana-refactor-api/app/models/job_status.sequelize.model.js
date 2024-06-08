'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, BOOLEAN, STRING, DATE } = DataTypes

  class JobStatusModel extends Model {}

  JobStatusModel.init(
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
      modelName: 'job_status',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  )

  return JobStatusModel
}
