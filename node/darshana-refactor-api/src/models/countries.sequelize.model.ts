'use strict'

module.exports = (sequelize: any, DataTypes: any) => {
  const { Model } = require('sequelize')
  const { DATE, STRING, BIGINT } = DataTypes

  class CountriesModel extends Model {}

  CountriesModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name: STRING,
      nombre: STRING,
      nom: STRING,
      iso2: STRING,
      iso3: STRING,
      phone_code: STRING,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'countries',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return CountriesModel
}
