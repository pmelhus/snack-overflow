'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {firstName: 'Anthony', lastName: 'Bronca', userName: 'seededUser1', userScore:0, email: 'dummy1@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-04-12', updatedAt: '2019-04-12'},
      {firstName: 'Krishna', lastName: 'Mulloth', userName: 'seededUser2', userScore:0, email: 'dummy2@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-04-12', updatedAt: '2019-04-12'},
      {firstName: 'Dominic', lastName: 'Clust', userName: 'seededUser3', userScore:5, email: 'dummy3@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-02-02', updatedAt: '2021-01-10'},
      {firstName: 'Paul', lastName: 'Melhus', userName: 'seededUser4', userScore:5, email: 'dummy4@test.com', hashedPassword: 'dummyhashedPassword', createdAt: '2019-02-02', updatedAt: '2021-01-10'},
      {firstName: 'Demo', lastName: 'User', userName: 'demoUser', userScore:0, email: 'demoUser4@test.com', hashedPassword: 'DemoUserPassword123!', createdAt: '2019-02-02', updatedAt: '2021-01-10'},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
