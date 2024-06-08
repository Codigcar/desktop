'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { DATE, BIGINT, UUID } = DataTypes

  class UserGendersModel extends Model {
    static associate(models) {
      UserGendersModel.belongsTo(models.genders, {
        foreignKey: 'gender_id',
        targetKey: 'id',
      })
    }
  }

  UserGendersModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      user_uuid: {
        type: UUID,
      },
      gender_id: {
        type: BIGINT,
      },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'user_genders',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UserGendersModel
}
