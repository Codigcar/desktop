'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { BIGINT, DATE, BOOLEAN, STRING, DOUBLE } = DataTypes

  class UserDetailsModel extends Model {
    static associate(models) {
      UserDetailsModel.belongsToMany(models.languages, {
        through: models.users_languages,
        foreignKey: 'user_details_id',
      })
      UserDetailsModel.belongsToMany(models.skills, {
        through: models.user_details_skills,
        foreignKey: 'user_detail_id',
      })
      UserDetailsModel.belongsToMany(models.roles_interest, {
        through: models.users_roles_interest,
        foreignKey: 'user_details_id',
      })
      UserDetailsModel.belongsTo(models.users_industries, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
      })
      UserDetailsModel.hasMany(models.user_workplaces, {
        sourceKey: 'user_uuid',
        foreignKey: 'user_uuid',
      })
    }
  }

  UserDetailsModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      user_uuid: STRING,
      full_name: STRING,
      purpose: STRING,
      country_id: BIGINT.UNSIGNED,
      subtitle: STRING,
      summary: STRING,
      profile_picture_url: STRING,
      profile_banner_url: STRING,
      is_talent: BOOLEAN,
      google_id: STRING,
      phone: STRING,
      contact_phone2: STRING,
      facebook_url: STRING,
      linkedin_url: STRING,
      github_url: STRING,
      contact_email: STRING,
      contact_phone: STRING,
      city_id: BIGINT.UNSIGNED,
      paypal_email: STRING,
      paypal_url: STRING,
      algo_address: STRING,
      twitter_url: STRING,
      near_wallet: STRING,
      discord_url: STRING,
      profile_percentage: DOUBLE,
      verify_email: STRING,
      is_top: BOOLEAN,
      default_cover_image_url: STRING,
      cv_resumen_file_name: STRING,
      cv_resumen_file_size: STRING,
      cv_resumen_file_url: STRING,
      ubigeo_country: STRING,
      ubigeo_city: STRING,
      ubigeo_state: STRING,
      sex: STRING,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'user_details',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return UserDetailsModel
}
