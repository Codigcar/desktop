'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('cities');
    await queryInterface.createTable('cities', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      country_iso2: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.DOUBLE,
      },
      lng: {
        type: Sequelize.DOUBLE,
      },

      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cities');
  }
};
