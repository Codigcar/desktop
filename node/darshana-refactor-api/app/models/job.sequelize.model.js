'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, BIGINT, BOOLEAN, STRING, UUID, DATE, DOUBLE } = DataTypes

  class JobModel extends Model {
    static associate(models) {
      JobModel.belongsTo(models.job_status)
      JobModel.belongsTo(models.business)
      JobModel.belongsTo(models.work_modalities)
      JobModel.belongsTo(models.countries)
      JobModel.hasMany(models.job_applications)
    }
  }

  JobModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      recruiter_id: BIGINT.UNSIGNED,
      business_id: BIGINT.UNSIGNED,
      job_status_id: BIGINT.UNSIGNED,
      work_modality_id: INTEGER.UNSIGNED,
      country_id: INTEGER.UNSIGNED,

      name: STRING,
      description: STRING,
      status: BOOLEAN,
      contract_type: STRING,
      summary: STRING,
      salary: DOUBLE,
      end_date: DATE,
      contract_time: STRING,
      is_visible: BOOLEAN,
      user_uuid: UUID,
      min_salary: DOUBLE,
      max_salary: DOUBLE,
      hourly_wage: DOUBLE,
      category: STRING,
      is_top: BOOLEAN,
      stripe_id: STRING,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'job',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  )

  return JobModel
}
