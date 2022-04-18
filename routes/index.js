const express = require('express');
const { Op, sequelize } = require('sequelize')
const router = express.Router();
const { User, Question, Answer } = require('../db/models')

const { asyncHandler } = require('../utils')
// const { requireAuth } = require('../auth')

const searchQuestions = async(term) => {
  await Question.findAll({
      where: {title: {[Op.substring]: term}},
      include: [Answer, User],
      order: [['createdAt', 'DESC']]
  })
}
/* GET home page. */
router.get('/', asyncHandler(async(req, res, next)=>{
  if (req.session.auth) {
    const {userId} = req.session.auth
    const user = await User.findByPk(userId)
    const questions = await Question.findAll({include: [Answer, User], order: [['createdAt', 'DESC']]})
    return res.render('questions', { title: 'Snack Overfleaux', user, questions  });
  } else {
    const questions = await Question.findAll({include: [Answer, User], order: [['createdAt', 'DESC']]})
    return res.render('questions', { title: 'Snack Overfleaux', questions });
  }
}));

router.get('*', asyncHandler (async (req, res, next) => {
  console.log('WE HIT THIS ONE! ==============================HERE')
  const queryTerm = req.query.term.toString()
  if (req.session.auth && req.query.term) {
    const {userId} = req.session.auth
    const user = await User.findByPk(userId)
    const questions = searchQuestions(queryTerm)
    return res.render('search', { title: 'Search Results', user, questions, queryTerm })
  } else {
    const questions = await Question.findAll({include: [Answer, User], order: [['createdAt', 'DESC']]})
    return res.render('questions', { title: 'Snack Overfleaux', questions , authorization:req.session.auth });
  }
}))


module.exports = router;
