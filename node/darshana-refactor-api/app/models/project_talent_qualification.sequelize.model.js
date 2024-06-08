'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, DATE, UUID, DOUBLE, UUIDV4, STRING } = DataTypes

  class ProjectTalentQualificationModel extends Model {
    static associate(models) {
      ProjectTalentQualificationModel.belongsTo(models.project_applications, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
      })
    }
  }

  ProjectTalentQualificationModel.init(
    {
      uuid: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
      user_uuid: {
        type: UUID,
        allowNull: false,
      },

      project_id: {
        type: BIGINT,
        allowNull: false,
      },

      comment: {
        type: STRING,
      },
      score: {
        type: DOUBLE,
        allowNull: false,
      },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'project_talent_qualifications',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return ProjectTalentQualificationModel
}
