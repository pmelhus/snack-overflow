const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const { check, validationResult } = require("express-validator");
const { Question, Answer, User } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const csrfProtection = csrf({ cookie: true });

const validateAnswers = [
  //  Task name cannot be empty:
  check("answer")
    .exists({ checkFalsy: true })
    .withMessage("Answer Body can't be empty."),
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    //TODO: add the correct router once this is working with front end
    //split the router later maybe?
    const answers = await Answer.findAll({ include: [User, Question] });
    res.render("answers", { answers });
  })
);

router.post('/', asyncHandler(async(req,res)=>{
  console.log(req.body)
  res.redirect("/answers/new")
}))

router.get('/new', csrfProtection, asyncHandler(async(req,res,next)=>{
  const answerForm = await Answer.findAll({include:[User, Question]});
  res.render("answer-form", {answerForm});
}))

router.post('/new', validateAnswers, asyncHandler(async(req,res,next)=>{
  const newAnswer = req.body.body
  console.log(req.body)
  const newAnswer1 = await Answer.create({questionId:2, body:newAnswer, answerScore:0, userId:1, createdAt: 2022-02-01, updatedAt: 2022-02-01})
  const answers = await Answer.findAll({include: [User, Question]})
  //res.redirect("/answers")
  res.send('ok') //add a status to this later?
}))

module.exports = router;
