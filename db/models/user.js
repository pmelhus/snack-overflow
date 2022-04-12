'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    userScore: DataTypes.INTEGER,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY,
    profilePicture: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, {foreignKey: "userId"})
    User.hasMany(models.Answer, {foreignKey: "answerId"})
    User.hasMany(models.AnswerVote, {foreignKey: "userId"})
  };
  return User;
};
