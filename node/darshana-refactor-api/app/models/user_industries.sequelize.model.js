'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { DATE, BIGINT, UUID } = DataTypes

  class UsersIndustriesModel extends Model {
    static associate(models) {
      UsersIndustriesModel.belongsTo(models.industries, {
        foreignKey: 'industry_id',
        targetKey: 'id',
      })
    }
  }

  UsersIndustriesModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      user_uuid: {
        type: UUID,
      },
      industry_id: {
        type: BIGINT,
      },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'users_industries',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UsersIndustriesModel
}
