'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE, BOOLEAN } = DataTypes

  class SkillsModel extends Model {
    static associate(models) {
      SkillsModel.belongsToMany(models.user_details, {
        through: models.user_details_skills,
      })
    }
  }

  SkillsModel.init(
    {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING },
      required: { type: BOOLEAN },

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'skills',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return SkillsModel
}
