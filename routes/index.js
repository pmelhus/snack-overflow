const express = require('express');
const { Op, sequelize } = require('sequelize')
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { asyncHandler } = require('../utils')
// const { requireAuth } = require('../auth')


/* GET home page. */
router.get('/', asyncHandler(async(req, res, next)=>{
  const questions = await Question.findAll( {include: [Answer, User]});
  if (req.session.auth) {
    const {userId} = req.session.auth
    const user = await User.findByPk(userId)
    res.render('questions', { title: 'Welcome to Snack Overfleaux!', user, questions  });
  }else{
    res.render('index', { title: 'Welcome to Snack Overfleaux!', questions });
  }
}));

const searchResults = async(q) => {
  const questions = await Question.findAll({
    where: {
      title: {
        [Op.substring]: q
      }
    },
    include: [Answer, User]
  })
  return questions
}

router.get('/search?(\\w+)', asyncHandler(async(req, res, next) => {
  let query = req.url.split('=')[1].toString()
  if (query.includes('+')) {
    query.replaceAll('+', ' ')
  }
  const results = await searchResults(query)
  res.render('search', {title: 'Snack Search', results, query})
}))


module.exports = router;
