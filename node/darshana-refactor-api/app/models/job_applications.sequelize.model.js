'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { STRING, UUID, DATE, INTEGER, BOOLEAN, BIGINT } = DataTypes

  class JobApplicationModel extends Model {
    static associate(models) {
      JobApplicationModel.belongsTo(models.job)
      JobApplicationModel.belongsTo(models.user_details, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
      })
    }
  }

  JobApplicationModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      user_uuid: UUID,
      job_id: BIGINT.UNSIGNED,
      summary: STRING,
      experience: STRING,
      file_url: STRING,
      file_name: STRING,
      file_size: STRING,
      time_proposal: INTEGER,
      selected: INTEGER,
      close_at_proposal: DATE,
      algorand_transaction: STRING,
      near_transaction: STRING,
      ready_to_close: BOOLEAN,
      updated: BOOLEAN,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'job_applications',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return JobApplicationModel
}
