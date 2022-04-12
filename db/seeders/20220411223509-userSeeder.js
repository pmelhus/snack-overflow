'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {firstName: 'Dummy1', lastName: 'Surname1', userName: 'seededUser1', userScore:0, email: 'dummy1@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-04-12', updatedAt: '2019-04-12'},
      {firstName: 'Dummy2', lastName: 'Surname2', userName: 'seededUser2', userScore:0, email: 'dummy2@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-04-12', updatedAt: '2019-04-12'},
      {firstName: 'Dummy3', lastName: 'Surname3', userName: 'seededUser3', userScore:5, email: 'dummy3@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-02-02', updatedAt: '2021-01-10'},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
