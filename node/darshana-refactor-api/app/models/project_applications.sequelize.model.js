'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const { STRING, UUID, DATE, INTEGER, BOOLEAN, BIGINT, DOUBLE } = DataTypes

  class ProjectApplicationModel extends Model {
    static associate(models) {
      ProjectApplicationModel.belongsTo(models.user_details, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
      })
      ProjectApplicationModel.belongsTo(models.projects, {
        foreignKey: 'project_id',
        targetKey: 'id',
      })
      ProjectApplicationModel.belongsTo(models.whiz_user_cache, {
        foreignKey: 'user_uuid',
        targetKey: 'user_uuid',
      })
      ProjectApplicationModel.hasMany(models.project_talent_qualifications, {
        sourceKey: 'user_uuid',
        foreignKey: 'user_uuid',
      })
    }
  }

  ProjectApplicationModel.init(
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

      user_uuid: UUID,
      project_id: BIGINT.UNSIGNED,
      proposal: STRING,
      procedure_text: STRING,
      accept_price: BOOLEAN,
      price_proposal: DOUBLE,
      accept_time: BOOLEAN,
      days: INTEGER,
      ready_to_close: BOOLEAN,
      accepted: INTEGER,
      close_at_proposal: DATE,
      recieve_pay_at: DATE,
      send_pay_at: DATE,
      recieve_pay_order_id: STRING,
      send_pay_order_id: STRING,
      talent_payment: DOUBLE,
      weeks: INTEGER,
      shown_accepted_message: BOOLEAN,
      algorand_transaction: STRING,
      near_transaction: STRING,
      updated: BOOLEAN,
      salary_counter_proposal: BOOLEAN,
      time_counter_proposal: INTEGER,
      counter_proposal_status: INTEGER,

      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'project_applications',
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  )

  return ProjectApplicationModel
}
