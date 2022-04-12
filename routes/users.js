const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { check } = require("express-validator");
const { User } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require("../utils");
const { loginUser, logoutUser } = require('../auth')
const csrfProtection = csrf({cookie: true})
const bcrypt = require('bcryptjs')

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
    check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
];

const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

router.post("/", validateUsername, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
    // TODO: User creation logic
  })
);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build()
  res.render('user-signup', {
    title: 'Signup Form',
    csrfToken: req.csrfToken(),
    user
  })
}))

router.post('/signup', asyncHandler(async(req, res) => {
  const {firstName, lastName, userName, email, password, confirmPassword} = req.body;
  const user = User.build({firstName, lastName, userName, email})

  if (user){
    const hashedPassword = await bcrypt.hash(password, 10)
    user.hashedPassword = hashedPassword;
    await user.save()
    return res.redirect('/')
  } else {
    res.render('user-signup', {
      title: 'Signup form',
      csrfToken: req.csrfToken,
      user
    })
  }

}))

module.exports = router;