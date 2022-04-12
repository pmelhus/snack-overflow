'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imageOptional1: {
        type: Sequelize.TEXT
      },
      imageOptional2: {
        type: Sequelize.TEXT
      },
      imageOptional3: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questions');
  }
};
