'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const { DATE, BIGINT } = DataTypes
  class UsersLanguagesModel extends Model {}
  UsersLanguagesModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      user_details_id: {
        type: BIGINT.UNSIGNED,
        // references: { model: { tableName: 'user_details' }, key: 'id' },
      },
      language_id: {
        type: BIGINT,
        // references: { model: { tableName: 'languages' }, key: 'id' },
      },
      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'users_languages',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return UsersLanguagesModel
}
