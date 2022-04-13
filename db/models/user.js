'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    userScore: DataTypes.INTEGER,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    profilePicture: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, {foreignKey: "questionId"})
    User.hasMany(models.Answer, {foreignKey: "answerId"})
    User.hasMany(models.AnswerVote, {foreignKey: "userId"})
  };
  return User;
};
