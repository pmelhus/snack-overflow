const express = require('express');
// const { Op, sequelize } = require('sequelize')
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { asyncHandler } = require('../utils');
// const { searchHelper } = require('../public/javascripts/search')
const { requireAuth } = require('../auth')


/* GET home page. */
router.get('/', asyncHandler(async(req, res, next)=>{
  const questions = await Question.findAll( {include: [Answer, User]});
  if (req.session.auth) {
    const {userId} = req.session.auth
    const user = await User.findByPk(userId)
    res.render('questions', { title: 'Welcome to Snack Overfleaux!', user, questions  });
  }else{
    res.render('questions', { title: 'Welcome to Snack Overfleaux!', questions });
  }
}));

// const searchResults = async(term) => {
//   const questions = await Question.findAll({
//     where: {
//       title: {
//         [Op.substring]: term
//       }
//     },
//     include: [Answer, User]
//   })
//   return questions
// }

// router.get('/', searchHelper, asyncHandler(async(req, res, next) => {
//   let results = []
//   const rawQuery = req.params.url.split('?q=')[1].toString()
//   if (rawQuery.includes('%20')) {
//     const spacedQuery = rawQuery.split(spacer).join(' ')
//     results = await searchResults(spacedQuery)
//   } else {
//     results = await searchResults(rawQuery)
//   }
//   res.render('search', {title: 'Snack Search', results, rawQuery, spacedQuery})
// }))



module.exports = router;
