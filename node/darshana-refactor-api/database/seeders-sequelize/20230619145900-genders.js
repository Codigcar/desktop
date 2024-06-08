'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('genders', [
      {name_en:'Female',name_es:'Femenino'},
      {name_en:'Male',name_es:'Masculino'},
      {name_en:'Rather not say',name_es:'Prefiero no decirlo'},
  ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('genders', null, {});
  }
};
