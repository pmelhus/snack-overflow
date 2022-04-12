'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answers', [
    {questionId: 2, body: "To make a pb, you need to get two slices of bread. You can toast them up or have then plain. Apply PB to one slice and Jelly/Jam to the other slice. Make sure to spread evenely. Combine the two slices by pressing them together to make one sandwich. Make sure the pb and jelly are touching. You may cut it into halves or eat it as a whole. Enjoy!",
    userId:2, createdAt: "2021-03-05", updatedAt: "2021-03-05"
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Answers', null, {});
  }
};
