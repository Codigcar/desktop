'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const { DATE, STRING, BIGINT } = DataTypes

  class UserWorkplaceVerifyStatusModel extends Model {
    // static associate(models) {
    //   ChatGptModel.belongsTo(models.user_details, {
    //     foreignKey: 'user_uuid',
    //     targetKey: 'user_uuid',
    //   })
    // }
  }
  UserWorkplaceVerifyStatusModel.init(
    {
      // uuid: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      status: STRING,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'user_workplaces_verify_status',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return UserWorkplaceVerifyStatusModel
}
