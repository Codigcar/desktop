'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_talent_qualifications', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      
      project_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },


      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('project_talent_qualifications');
  }
};
