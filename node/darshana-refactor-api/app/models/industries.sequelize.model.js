'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { DATE, STRING, BIGINT } = DataTypes

  class IndustriesModel extends Model {
    /*  static associate(models) {
      IndustriesModel.belongsToMany(models.user_details, {
        through: models.users_industries,
      })
    } */
  }

  IndustriesModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name_en: STRING,
      name_es: STRING,
      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'industries',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return IndustriesModel
}
