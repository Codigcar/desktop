"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_details", "state", {
      type: Sequelize.STRING,
      defaultValue: 'available'
    });
 
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user_details', 'state')
  },
};
