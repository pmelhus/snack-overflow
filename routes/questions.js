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
    const {id, title, body, imageOptional1, imageOptional2, imageOptional3} = req.body;
    const question = await Question.findByPk(id, {include: [Answer, User]});
    res.render('question-page');
}))

module.exports = router;
