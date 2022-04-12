'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
    {firstName: 'Dummy1',lastName:'Surname1', userName:'seededUser1', userScore:0,email:'dummy1@test.com',password:'dummyPassword', createdAt: '2019-04-12', updatedAt: '2019-04-12'},
    {firstName:'Dummy1', lastName:'Surname', userName:'seededUser2', userScore:0, email:'dummy2@test.com', password:'dummyPassword', createdAt: '2019-04-12', updatedAt: '2019-04-12'},
    { firstName:'Dummy3', lastName:'Surname', userName:'seededUser3', userScore:5, email:'dummy3@test.com', password:'dummyPassword', createdAt: '2019-02-02' ,updatedAt: '2021-01-10'},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
