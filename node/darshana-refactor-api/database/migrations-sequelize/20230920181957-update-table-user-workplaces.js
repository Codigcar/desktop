"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface/* , Sequelize */) {
    await queryInterface.bulkInsert('user_workplaces_verify_status', [
      {status:'No iniciado',},
      {status:'En proceso',},
      {status:'Verificado',},
  ]);

    // await queryInterface.addColumn("user_workplaces", "verify_status_id", {
    //   type: Sequelize.BIGINT,
    //   defaultValue: 1,
    //   references: { model: { tableName: 'user_workplaces_verify_status' }, key: 'id' },
    // });
 
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user_workplaces', 'verify_status_id')
  },
};
