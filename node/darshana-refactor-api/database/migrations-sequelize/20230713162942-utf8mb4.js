"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.queryGenerator.sequelize.query(`
    ALTER TABLE user_details CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
  },

  async down(/* queryInterface */) {
  },
};




