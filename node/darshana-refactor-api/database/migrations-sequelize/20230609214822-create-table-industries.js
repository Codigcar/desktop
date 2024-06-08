'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('industries', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name_en: {
        type: Sequelize.STRING,
      },
      name_es: {
        type: Sequelize.STRING,
      },

      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('industries');
  }
};
