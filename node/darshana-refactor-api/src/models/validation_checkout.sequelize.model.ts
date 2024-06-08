'use strict'

module.exports = (sequelize: any, DataTypes: any) => {
  const { Model } = require('sequelize')
  const { DATE, BIGINT, STRING, BOOLEAN } = DataTypes

  class ValidationCheckoutModel extends Model {
    // static associate(models: any) {
    // UsersLanguagesModel.belongsTo(models.user_details, {
    //   foreignKey: 'user_details_id',
    //   targetKey: 'id',
    // })
    // UsersLanguagesModel.belongsTo(models.languages, {
    //   foreignKey: 'language_id',
    //   targetKey: 'id',
    // })
    //}
  }

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
