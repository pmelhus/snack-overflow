'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Questions', [
    {userId:1, title: "HOW DO I MAKE A PEANUT BUTTER AND JELLY SANDWICH?", body: "I am trying to make a peanut butter and jelly sandwich like my mom used to make, however, I don't see any instructions on either jar or the bread?!", createdAt: '2021-03-01', updatedAt: '2021-03-01'},
    {userId:1, title: "My Girlfriend wants me to 'Dethaw chicken'?", body: "my girlfriend called me just now. She told me to de-thaw the chicken but I don't know how I do that? Other posts told me to throw it off the balcony but that doesn't seem correct. Any insight?", createdAt: '2021-03-06', updatedAt: '2021-03-06'}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Questions', null, {});
  }
};
