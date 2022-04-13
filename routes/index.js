const express = require('express');
const router = express.Router();
const { User, Question, Answer } = require('../db/models')


/* GET home page. */
router.get('/', function(req, res, next) {
  if (res.locals.authenticated) {
    const {userId} = req.session.auth
    const user = User.findByPk(userId)
    res.render('questions', { title: 'Welcome to Snack Overflow!', user,  });
  }else{
    res.render('index', { title: 'Welcome to Snack Overflow!' });
  }
});

module.exports = router;
