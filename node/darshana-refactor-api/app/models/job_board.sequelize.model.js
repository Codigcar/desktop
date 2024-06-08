'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { UUIDV4, STRING, UUID, DATE } = DataTypes

  class JobBoardModel extends Model {
    // static associate(models) {}
  }

  JobBoardModel.init(
    {
      uuid: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
      logo: STRING,
      banner: STRING,
      domain: STRING,
      placeholder: STRING,
      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'job_board',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  )

  return JobBoardModel
}
