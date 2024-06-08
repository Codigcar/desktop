"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_details", "sex", {
      type: Sequelize.STRING,
      defaultValue: null
    });
 
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user_details', 'sex')
  },
};
