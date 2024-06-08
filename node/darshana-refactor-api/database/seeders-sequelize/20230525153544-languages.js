'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('languages', [
      {name_en:'Arabic',name_es:'Árabe'},
      {name_en:'Bengali',name_es:'Bengalí'},
      {name_en:'Bulgarian',name_es:'Bulgaro'},
      {name_en:'Catalan',name_es:'Catalán'},
      {name_en:'Chinese',name_es:'Chino'},
      {name_en:'Czech',name_es:'Checo'},
      {name_en:'Danish',name_es:'Danés'},
      {name_en:'Dutch',name_es:'Holandés'},
      {name_en:'English',name_es:'Inglés'},
      {name_en:'Finnish',name_es:'Finlandes'},
      {name_en:'French',name_es:'Francés'},
      {name_en:'German',name_es:'Alemán'},
      {name_en:'Gujarati',name_es:'Gujarati'},
      {name_en:'Hindi',name_es:'Indú'},
      {name_en:'Hungarian',name_es:'Húngaro'},
      {name_en:'Indonesian',name_es:'Indonés'},
      {name_en:'Italian',name_es:'Italiano'},
      {name_en:'Japanese',name_es:'Japonés'},
      {name_en:'Korean',name_es:'Koreano'},
      {name_en:'Polish',name_es:'Polaco'},
      {name_en:'Portuguese',name_es:'Portugués'}, 
      {name_en:'Russian',name_es:'Ruso'},
      {name_en:'Spanish',name_es:'Español'},
      {name_en:'Turkish',name_es:'Turko'},
      {name_en:'Quechua',name_es:'Quechua'},
      {name_en:'Aymara',name_es:'Aymara'},
      {name_en:'Greek',name_es:'Griego'},
      {name_en:'Romanian',name_es:'Rumano'},
      {name_en:'Serbian',name_es:'Serbio'},
      {name_en:'Ukrainian',name_es:'Ukraniano'},
      {name_en:'Malay',name_es:'Malayo'},
      {name_en:'Thai',name_es:'Thai'},
      {name_en:'Braile',name_es:'Braile'},
      {name_en:'American sign language',name_es:'Lenguage de señas'},
      {name_en:'Norwegian',name_es:'Noruego'},
      {name_en:'Swedish',name_es:'Sueco'},
      {name_en:'Estonian',name_es:'Estonio'},
      {name_en:'Lithuanian',name_es:'Lituano'},
  
  ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('languages', null, {});
  }
};
