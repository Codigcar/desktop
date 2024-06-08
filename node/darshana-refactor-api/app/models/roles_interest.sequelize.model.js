'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes

  class RolesInterestModel extends Model {
    static associate(models) {
      RolesInterestModel.belongsToMany(models.user_details, {
        through: models.users_roles_interest,
      })
    }
  }

  RolesInterestModel.init(
    {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'roles_interest',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return RolesInterestModel
}
