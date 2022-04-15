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

router.post('/', asyncHandler(async (req, res) => {
  console.log(req.body)
  res.redirect("/answers/new")
}))

router.get('/new', csrfProtection, asyncHandler(async (req, res, next) => {
  const answerForm = await Answer.findAll({ include: [User, Question] });
  res.render("answer-form", { answerForm });
}))

router.post('/:id',validateAnswers, asyncHandler(async(req,res,next)=>{
  const newAnswer = req.body.body
  const urlId = req.params.id
  const postingUser = req.session.auth.userId;
  const answer = await Answer.create({questionId: urlId, body:newAnswer, answerScore:0, userId:postingUser})
  const answers = await Answer.findAll({include: [User, Question]})
  //res.redirect("/answers")
  console.log(answer.id)
  res.json({"id":`${answer.id}`,"body":`${answer.body}`,"createdAt":`${answer.createdAt}`}) //add a status to this later?
}))



router.delete("/instant/:id", asyncHandler(async (req, res) => {
  const id = req.params.id
  const answer = await Answer.findByPk(id)
  await answer.destroy()
  console.log('id')
  res.send('ok');
}));

router.delete("/:id", asyncHandler(async (req, res) => {
  const id = req.params.id
  const answer = await Answer.findByPk(id)
  await answer.destroy()
  console.log('id')
  res.send('ok');
}));

router.put("/instant/:id", asyncHandler(async (req, res) => {
  const id = req.params.id
  const newBody = req.body.content
  const edit = await Answer.findByPk(id)
  const editedBody = await edit.update({body:newBody})
  res.json({"updatedBody": `${editedBody.body}`})
}))

router.put("/:id", asyncHandler(async (req, res) => {
  //console.log('am i getting here???????')
  const id = req.params.id
  const newBody = req.body.content
  const edit = await Answer.findByPk(id)
  const editedBody = await edit.update({body:newBody})
  res.json({"updatedBody": `${editedBody.body}`})
}))


module.exports = router;
