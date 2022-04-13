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

router.get('/new', asyncHandler(async(req, res) => {
    // TODO: pass in tags to render
    res.render('question-form')
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
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        const question = await Question.create({title, body})
        res.redirect('/questions')
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render("questions-form", {
            question,
            errors,
          });
    }
}))

module.exports = router;
