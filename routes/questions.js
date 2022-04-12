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

module.exports = router;
