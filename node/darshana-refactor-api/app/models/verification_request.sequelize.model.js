'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const { DATE, BIGINT, STRING, BOOLEAN } = DataTypes
  class VerificationRequestModel extends Model {}
  VerificationRequestModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      email_talent: STRING,
      url_link: STRING,
      is_verify: { type: BOOLEAN, defaultValue: false },
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      sequelize,
      modelName: 'verification_request',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return VerificationRequestModel
}
