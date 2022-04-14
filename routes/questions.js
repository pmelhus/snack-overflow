const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const { check, validationResult } = require("express-validator");
const { Question, Answer, User } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const csrfProtection = csrf({ cookie: true });
const { requireAuth } = require("../auth");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ include: [Answer, User] });
    let answers = questions.map(
      async (q) => await Answer.findAll({ where: { questionId: q.id } })
    );
    if (res.locals.authenticated) {

        const loggedInUser = await User.findByPk(res.locals.user.id);
        res.render("questions", { loggedInUser, questions, answers })

    } else {
      res.render("questions", { questions, answers });
    }
  })
);

router.get(
  "/new",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { question, user } = req.body;
    res.render("question-form", question, user);
  })
);

const questionValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for title")
    .isLength({ max: 255 })
    .withMessage("Title must not be more than 255 characters long."),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for body"),
];


router.post('/new', questionValidators, asyncHandler(async(req, res) => {
    const {title, body} = req.body

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const question = await Question.create({
        userId: res.locals.user.id,
        title,
        body,
      });
      res.redirect("/questions");
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      res.render("questions-form", {
        question,
        errors,
      });
    }
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const id = await req.params.id;
    const loggedInUser = await User.findByPk(res.locals.user.id);
    const question = await Question.findByPk(id, { include: [Answer, User] });
    const answers = await Answer.findAll({
      where: { questionId: question.id },
    });
    const { questionId, body, answerScore, userId } = Answer;
    await Answer.build();
    return res.render("question-page", { question, answers, id, loggedInUser });
  })
);

router.get(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res) => {
    const id = await req.params.id;


    res.render("delete-confirmation", { id });
  })
);

router.post(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    question.destroy();
    res.redirect("/questions");
  })
);

    const question = await Question.findByPk(id, {include: [Answer, User]});
    const answers = await Answer.findAll({where: {questionId: question.id}})
    const loggedInUser = await User.findByPk(res.locals.user.id);
    const { questionId, body, answerScore, userId} = Answer
    await Answer.build()
    return res.render('question-page', {question, answers, loggedInUser});
}));

// router.put('/:id(\\d+)', asyncHandler(async(req, res, next) => {
//     const id = await req.params.id;
//     const question = await Question.findByPk(id, {include: [Answer, User]});
//     const answers = await Answer.findAll({where: {questionId: question.id}})
//     const { questionId, body, answerScore, userId} = Answer
//     await Answer.update()
//     return res.render('question-page', {question, answers});
// }))


module.exports = router;
