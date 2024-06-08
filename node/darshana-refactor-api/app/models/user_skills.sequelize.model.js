'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, DATE } = DataTypes

  class UserSkillModel extends Model {}

  UserSkillModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      user_detail_id: { type: BIGINT.UNSIGNED },
      skill_id: { type: BIGINT.UNSIGNED },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'user_details_skills',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UserSkillModel
}
