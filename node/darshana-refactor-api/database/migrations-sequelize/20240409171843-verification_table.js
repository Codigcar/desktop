'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('validation_checkout', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email:{
        type:Sequelize.STRING
      },
      verification_number: {
        type: Sequelize.INTEGER
      },
      is_per_month: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      payment_link: {
        type: Sequelize.STRING
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down (queryInterface) {
  await queryInterface.dropTable('validation_checkout');
  }
};
