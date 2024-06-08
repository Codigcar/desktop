"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.queryGenerator.sequelize.query(`
    alter table skills
    drop key skills_id_uindex;
    `);
    await queryInterface.queryGenerator.sequelize.query(`
    alter table skills
    drop key skills_name_uindex;
    `);
  },

  async down(/* queryInterface */) {
  },
};
