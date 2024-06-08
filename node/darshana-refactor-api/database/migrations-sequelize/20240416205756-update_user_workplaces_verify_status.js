'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,Sequelize) {
    // Agrega una nueva fila a la tabla user_workplaces_verify_status
    await queryInterface.bulkInsert('user_workplaces_verify_status', [
      { status: 'Denegado' },
    ]);
    await queryInterface.addColumn("user_workplaces", "verification_response", {
      type: Sequelize.STRING,
      defaultValue: null
    });
    
  },

  async down(queryInterface,Sequelize) {
    // Elimina la fila que agregaste en la migración up
    await queryInterface.bulkDelete('user_workplaces_verify_status', { status: 'Denegado' });
    await queryInterface.removeColumn("user_workplaces", "verification_response", {
      type: Sequelize.STRING,
      defaultValue: null
    });
  },
};

