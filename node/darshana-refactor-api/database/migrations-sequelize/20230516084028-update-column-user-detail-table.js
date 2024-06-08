"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_details", "cv_resume_url", {
      type: Sequelize.STRING,
      defaultValue: null
    });
    await queryInterface.addColumn("user_details", "other_link_work", {
      type: Sequelize.STRING,
      defaultValue: null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user_details', 'cv_resume_url')
    await queryInterface.removeColumn('user_details', 'other_link_work')
  },
};
