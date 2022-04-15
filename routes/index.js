const express = require('express');
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { asyncHandler } = require('../utils');
// const { requireAuth } = require('../auth')


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

module.exports = router;
