'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    answerScore: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    imageOptional1: DataTypes.TEXT,
    imageOptional2: DataTypes.TEXT,
    imageOptional3: DataTypes.TEXT
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {foreignKey: "questionId"})
    Answer.belongsTo(models.User, {foreignKey:"userId"})
  };
  return Answer;
};
