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


router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    res.redirect("/answers/new");
  })
);

router.get(
  "/new",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const answerForm = await Answer.findAll({ include: [User, Question] });
    res.render("answer-form", { answerForm });
  })
);

router.post(
  "/new",
  validateAnswers,
  asyncHandler(async (req, res, next) => {
    const newAnswer = req.body.body;
    const answers = await Answer.findAll({ include: [User, Question] });

    req.rawHeaders.forEach((header) => {
      if (header.includes("questions/")) {
        const urlId = header.split("/")[4];
        const postingUser = req.session.auth.userId;
        Answer.create({
          questionId: urlId,
          body: newAnswer,
          answerScore: 0,
          userId: postingUser,
        });
        //res.redirect("/answers")
        res.send("ok"); //add a status to this later?
      }
    });
    // const urlId = parseInt(req.rawHeaders[27].split('/')[4]);
    // const postingUser = req.session.auth.userId;
    // await Answer.create({questionId: urlId, body:newAnswer, answerScore:0, userId:postingUser})
    // const answers = await Answer.findAll({include: [User, Question]})
    //res.redirect("/answers")
    // res.send('ok') //add a status to this later?
  })
);



router.put(
  '"/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const answer = await Answer.findByPk(id);

    answer.body = req.body.body;
    await answer.save();

    res.json({
      message: "Success",
      answer,
    });
  })
);


module.exports = router;
