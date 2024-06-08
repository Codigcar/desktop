'use strict'

module.exports = (sequelize: any, DataTypes: any) => {
  const { Model } = require('sequelize')
  const { DOUBLE, DATE, STRING, BIGINT } = DataTypes

  class CitiesModel extends Model {
    static associate(models: any) {
      CitiesModel.belongsTo(models.countries, {
        foreignKey: 'country_iso2',
        targetKey: 'iso2',
      })
    }
  }

  CitiesModel.init(
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      country_iso2: STRING,
      name: STRING,
      lat: DOUBLE,
      lng: DOUBLE,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'cities',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return CitiesModel
}
