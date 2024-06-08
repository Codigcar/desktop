'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('job_boards', 'placeholder', {
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('job_boards', 'placeholder')
  }
};
