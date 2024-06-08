"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("projects", "stripe_id", {
      type: Sequelize.STRING,
      defaultValue: null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('projects', 'stripe_id')
  },
};
