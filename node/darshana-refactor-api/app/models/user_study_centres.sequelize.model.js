'use strict'
const { Model, UUID, STRING, BOOLEAN } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, DATE } = DataTypes

  class UserStudyCentresModel extends Model {
    static associate(models) {
      UserStudyCentresModel.belongsTo(models.user_workplaces_verify_status, {
        foreignKey: 'verify_status_id',
        targetKey: 'id',
      })
    }
  }

  UserStudyCentresModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      user_uuid: UUID,
      name: STRING,
      course_name: STRING,
      description: STRING,
      start_date: DATE,
      end_date: DATE,
      studying_here: BOOLEAN,
      verify_status_id: BIGINT,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'user_study_centres',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UserStudyCentresModel
}
