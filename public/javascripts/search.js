const {Question, Answer, User} = require('../../db/models')
const {Op, sequelize} = require('sequelize')

const searchQuestions = async(term) => {
    await Question.findAll({
        where: {title: {[Op.substring]: term}},
        include: [Answer, User],
        order: [['createdAt', 'DESC']]
    })
}

module.exports = searchQuestions;
