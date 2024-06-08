'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, UUID, DATE, BOOLEAN, STRING } = DataTypes

  class UserWorkplaceModel extends Model {
    static associate(models) {
      UserWorkplaceModel.belongsTo(models.user_workplaces_verify_status, {
        foreignKey: 'verify_status_id',
        targetKey: 'id',
      })
    }
  }

  UserWorkplaceModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      user_uuid: UUID,
      start_date: DATE,
      end_date: DATE,
      description: STRING,
      work_here: BOOLEAN,
      position: STRING,
      workplace_id: BIGINT,
      workplace_name: STRING,
      enable_business: BOOLEAN,
      verify_status_id: BIGINT,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'user_workplaces',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UserWorkplaceModel
}
