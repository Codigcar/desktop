'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('roles_interest', [
      {name:'Backend'},
      {name:'BI'},
      {name:'Community manager '},
      {name:'Computer Engineering'},
      {name:'Computer Research Scientist'},
      {name:'Computer Systems Analyst'},
      {name:'Content creator'},
      {name:'Cryptocurrencies'},
      {name:'Cumputer Support specialist'},
      {name:'Cyber Security'},
      {name:'Data analytics'},
      {name:'Data Scientist'},
      {name:'Design Thinking'},
      {name:'Devops'},
      {name:'Digital marketing'},
      {name:'Frontend'},
      {name:'Full Stack'},
      {name:'Information Security Analyst'},
      {name:'Information Technology Manager'},
      {name:'Mobile developer'},
      {name:'Network and systems administration'},
      {name:'Project manager'},
      {name:'Project assistant '},
      {name:'QA'},
      {name:'Sales Engineer'},
      {name:'Scrum master'},
      {name:'Software Developer'},
      {name:'Software engineer'},
      {name:'Web Developer'},
      {name:'Agile Coach'},
      {name:'UX'},
      {name:'UI'},
      {name:'Tokenomics'},
      {name:'Graphic Designer'},
  ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('roles_interest', null, {});
  }
};
