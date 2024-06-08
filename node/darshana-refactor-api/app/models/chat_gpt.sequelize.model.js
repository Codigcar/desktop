'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const { UUID, DATE, STRING, BIGINT } = DataTypes
  class ChatGptModel extends Model {
    static associate(models) {
      ChatGptModel.belongsTo(models.user_details, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
      })
    }
  }
  ChatGptModel.init(
    {
      // uuid: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      user_uuid: UUID,
      question: STRING,
      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'chat_gpt',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )
  return ChatGptModel
}
