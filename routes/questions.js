const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const { check, validationResult } = require("express-validator");
const { Question, Answer, User } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const csrfProtection = csrf({ cookie: true });
const { requireAuth } = require('../auth');


router.get("/", asyncHandler(async(req, res) => {
    console.log("IN GET QUESTIONS ROUTER")
    console.log(req.session.auth)
    const questions = await Question.findAll( {include: [Answer, User]});
    res.render("questions", { questions })
}));

router.get('/new', requireAuth, asyncHandler(async(req, res) => {
    const {question, user} = req.body
    res.render('question-form', question, user)
}))

const questionValidators = [
    check("title")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a value for title")
      .isLength({ max: 255 })
      .withMessage("Title must not be more than 255 characters long."),
    check("body")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a value for body")
]

router.post('/new', questionValidators, asyncHandler(async(req, res) => {
    const {title, body} = req.body
    console.log(res.locals)
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        const question = await Question.create({userId: res.locals.user.id, title, body})
        res.redirect('/questions')
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render("questions-form", {
            question,
            errors,
          });
    }
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
