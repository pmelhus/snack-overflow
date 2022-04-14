const express = require('express');
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { asyncHandler } = require('../utils');


/* GET home page. */
router.get('/', asyncHandler(async(req, res, next)=>{
  if (res.locals.authenticated) {
    const {userId} = req.session.auth
    const user = User.findByPk(userId)
    const questions = await Question.findAll( {include: [Answer, User]});
    res.render('questions', { title: 'Welcome to Snack Overflow!', user,questions  });
  }else{
    res.render('index', { title: 'Welcome to Snack Overflow!' });
  }
}));

module.exports = router;
