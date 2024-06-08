'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('verification_request', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email_talent:{
        type:Sequelize.STRING
      },
      url_link: {
        type: Sequelize.STRING
      },
      is_verify:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down (queryInterface) {
  await queryInterface.dropTable('verification_request');
  }
};
