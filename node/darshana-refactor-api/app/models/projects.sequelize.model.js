'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, BIGINT, BOOLEAN, STRING, UUID, DATE, DOUBLE } = DataTypes

  class ProjectModel extends Model {
    static associate(models) {
      ProjectModel.belongsTo(models.topics)
      ProjectModel.belongsTo(models.project_statuses)
      ProjectModel.belongsTo(models.business)
      ProjectModel.belongsTo(models.countries)
      ProjectModel.belongsTo(models.user_details, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
        // as: 'owner',
      })
      ProjectModel.hasMany(models.project_applications)
      ProjectModel.hasMany(models.project_talent_qualifications, {
        sourceKey: 'id',
        foreignKey: 'project_id',
      })
    }
  }

  ProjectModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      topic_id: BIGINT.UNSIGNED,
      project_status_id: BIGINT.UNSIGNED,
      business_id: BIGINT.UNSIGNED,
      work_modality_id: INTEGER,
      country_id: INTEGER,
      name: STRING,
      description: STRING,
      status: BOOLEAN,
      body: STRING,
      price: DOUBLE,
      image_url: STRING,
      days: INTEGER,
      end_date: DATE,
      expected_close_at: DATE,
      weeks: INTEGER,
      is_visible: BOOLEAN,
      user_uuid: UUID,
      min_salary: DOUBLE,
      max_salary: DOUBLE,
      hourly_wage: DOUBLE,
      category: STRING,
      mobile_image_url: STRING,
      is_top: BOOLEAN,
      stripe_id: STRING,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'projects',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return ProjectModel
}
