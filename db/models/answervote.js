'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerVote = sequelize.define('AnswerVote', {
    vote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  AnswerVote.associate = function(models) {
    AnswerVote.belongsTo(models.User, {foreignKey:"userId"})
    AnswerVote.belongsTo(models.Answer, {foreignKey:"answerId"})
  };
  return AnswerVote;
};
