'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const { DATE, BIGINT, STRING, BOOLEAN } = DataTypes
  class ValidationCheckoutModel extends Model {}
  ValidationCheckoutModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      email: STRING,
      verification_number: BIGINT,
      is_per_month: BOOLEAN,
      payment_link: STRING,
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      sequelize,
      modelName: 'validation_checkout',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return ValidationCheckoutModel
}
