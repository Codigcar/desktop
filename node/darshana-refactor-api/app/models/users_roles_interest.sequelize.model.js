'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, DATE } = DataTypes

  class UsersRolesInterestModel extends Model {}

  UsersRolesInterestModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      user_details_id: { type: BIGINT.UNSIGNED },
      roles_interest_id: { type: BIGINT.UNSIGNED },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'users_roles_interest',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UsersRolesInterestModel
}
