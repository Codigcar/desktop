"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user_details", "cv_resume_url");
    await queryInterface.addColumn("user_details", "cv_resumen_file_name", {
      type: Sequelize.STRING,
      defaultValue: null
    });
    await queryInterface.addColumn("user_details", "cv_resumen_file_size", {
      type: Sequelize.STRING,
      defaultValue: null
    });
    await queryInterface.addColumn("user_details", "cv_resumen_file_url", {
      type: Sequelize.STRING,
      defaultValue: null
    });
  },

  async down(queryInterface) {
    await queryInterface.addColumn('user_details', 'cv_resume_url')
    await queryInterface.removeColumn('user_details', 'cv_resumen_file_name')
    await queryInterface.removeColumn('user_details', 'cv_resumen_file_size')
    await queryInterface.removeColumn('user_details', 'cv_resumen_file_url')
  },
};
