'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_roles_interest', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      user_details_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: { tableName: 'user_details' }, key: 'id' },
      },
      roles_interest_id: {
        type: Sequelize.BIGINT,
        references: { model: { tableName: 'roles_interest' }, key: 'id' },
      },

      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users_roles_interest');
  }
};
