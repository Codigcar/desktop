"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_details", "ubigeo_country", {
      type: Sequelize.STRING,
      defaultValue: null
    });
    await queryInterface.addColumn("user_details", "ubigeo_city", {
      type: Sequelize.STRING,
      defaultValue: null
    });
    await queryInterface.addColumn("user_details", "ubigeo_state", {
      type: Sequelize.STRING,
      defaultValue: null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user_details', 'ubigeo_country')
    await queryInterface.removeColumn('user_details', 'ubigeo_city')
    await queryInterface.removeColumn('user_details', 'ubigeo_state')
  },
};
