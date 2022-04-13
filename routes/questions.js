const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const { check, validationResult } = require("express-validator");
const { Question, Answer, User } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const csrfProtection = csrf({ cookie: true });

router.get("/", asyncHandler(async(req, res) => {
    const questions = await Question.findAll( {include: [Answer, User]});
    console.log(questions);
    res.render("questions", { questions })
}));

router.get('/new', csrfProtection, asyncHandler(async(req, res) => {
    res.render('question-form', {csrfToken: req.csrfToken()})
}))

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
    const id = await req.params.id;
    console.log(id);
    const question = await Question.findByPk(id, {include: [Answer, User]});
    const answers = await Answer.findAll({where: {questionId: question.id}})
    const { questionId, body, answerScore, userId} = Answer
    await Answer.build()
    return res.render('question-page', {question, answers});
}))

module.exports = router;
