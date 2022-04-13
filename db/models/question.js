'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    imageOptional1: DataTypes.TEXT,
    imageOptional2: DataTypes.TEXT,
    imageOptional3: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Answer, {foreignKey: "questionId"})
    Question.belongsTo(models.User, {foreignKey: "userId"})
  };
  return Question;
};
