const express = require('express');
// const { Op, sequelize } = require('sequelize')
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { asyncHandler } = require('../utils')
// const { requireAuth } = require('../auth')


/* GET home page. */
router.get('/', asyncHandler(async(req, res, next)=>{
  let questions;
  let user;

  if (req.session.auth && !req.query.term) {
    const {userId} = req.session.auth
    questions = await Question.findAll({include:[Answer, User], order: [['createdAt', 'DESC']]})
    user = await User.findByPk(userId)
    res.render('questions', { title: 'Welcome to Snack Overfleaux!', user, questions, authorization:req.session.auth  });
    return
  }

  if (req.session.auth && req.query.term){
    let query = req.query.term.toString().split('+').join(' ')
    console.log(query)

    questions = await Question.findAll({
      where: {
        title: {
          [Op.substring]: query
        }
      },
      include: [Answer, User],
      order: [['createdAt', 'DESC']]
    })
    res.render('search', {title: 'Snack Search', user, questions, query, authorization:req.session.auth })
  } else {
    questions = await Question.findAll({include: [Answer, User], order: [['createdAt', 'DESC']]
      });
    res.render('questions', { title: 'Welcome to Snack Overfleaux!', user, questions, authorization:req.session.auth  });
  }
}))



module.exports = router;
