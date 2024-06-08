'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, UUID, DATE } = DataTypes

  class BusinessModel extends Model {
    static associate(models) {
      BusinessModel.belongsTo(models.user_workplaces)
      BusinessModel.belongsTo(models.user_details, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
        as: 'owner',
      })
    }
  }

  BusinessModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      user_workplace_id: BIGINT.UNSIGNED,
      user_uuid: UUID,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'business',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return BusinessModel
}
