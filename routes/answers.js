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
        .withMessage("Answer Body can't be empty.")
]


router.get("/", asyncHandler(async(req,res)=>{
    //TODO: add the correct router once this is working with front end
    //split the router later maybe?
    const answers = await Answer.findAll({include: [User, Question]})
    res.render("answers", { answers })
}))




module.exports = router;
