"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.queryGenerator.sequelize.query(`
    alter table user_details_skills
        drop key user_details_skills_id_uindex;
    `);
  },

  async down(/* queryInterface */) {
  },
};




