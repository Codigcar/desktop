'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_industries', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      industry_id: {
        type: Sequelize.BIGINT,
      },

      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users_industries');
  }
};
