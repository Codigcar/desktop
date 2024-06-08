'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("user_study_centres", "verify_status_id", {
      type: Sequelize.BIGINT,
      defaultValue: 1,
      // references: { model: { tableName: 'user_workplaces_verify_status' }, key: 'id' },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("user_study_centres", "verify_status_id", {
      type: Sequelize.BIGINT,
      defaultValue: 1,
    });
  }
};
