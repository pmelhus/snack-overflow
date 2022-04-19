const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question, Answer, User, AnswerVote } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const csrfProtection = csrf({ cookie: true });

router.get('/up', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    console.log(req)
    res.json('UP!!!')
    // const upvote = await AnswerVote.create({vote: true, userId: userId, answerId: req.body.answerId})
}));
router.get('/down', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    console.log(res)
    res.json('DOWN!!!')
    // const downvote = await AnswerVote.create({vote: false, userId: userId, answerId: req.body.answerId})
}));

module.exports = router;
