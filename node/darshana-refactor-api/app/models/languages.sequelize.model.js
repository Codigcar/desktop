'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const { DATE, STRING, BIGINT } = DataTypes
  class LanguagesModel extends Model {
    static associate(models) {
      LanguagesModel.belongsToMany(models.user_details, {
        through: models.users_languages,
      })
    }
  }
  LanguagesModel.init(
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
      modelName: 'languages',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return LanguagesModel
}
