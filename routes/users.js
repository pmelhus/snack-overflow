const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const { check, validationResult } = require("express-validator");
const { User, Question, Answer } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const csrfProtection = csrf({ cookie: true });
const bcrypt = require("bcryptjs");

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for First Name")
    .isLength({ max: 50 })
    .withMessage("First Name must not be more than 50 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Last Name")
    .isLength({ max: 50 })
    .withMessage("Last Name must not be more than 50 characters long."),
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for User Name")
    .isLength({ max: 20 })
    .withMessage("User Name must not be more than 20 characters long.")
    .custom((value) => {
      return User.findOne({ where: { userName: value } }).then((user) => {
        if (user) {
          return Promise.reject("The provided user name is already in use.");
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address.")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long.")
    .isEmail()
    .withMessage("Email Address is not a valid email.")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided email address is already in use."
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password.")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password.")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password.");
      }
      return true;
    }),
];

router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await User.build();
    res.render("user-signup", {
      title: "Signup Form",
      csrfToken: req.csrfToken(),
      user,
    });
  })
);

router.post(
  "/signup",
  userValidators,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, userName, email, password, confirmPassword } =
      req.body;
    const user = await User.build({ firstName, lastName, userName, email });
    const validationErrors = validationResult(req);

    // const loggedInUser = await User.findAll({ where: { User: res.locals.user.id }});

    if (validationErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect("/questions");
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      // need to pass errors into a res.render method, but also need to ensure the correct
      // status and errors pass to the page
      // will need to make a pug template for incoming errors to display to potential users.

      res.render("user-signup", {
        title: "Signup form",
        csrfToken: req.csrfToken(),
        user,
        errors,
      });
    }
  })
);

router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("user-login", {
      title: "Login",
      csrfToken: req.csrfToken(),
    });
  })
);

const loginValidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password"),
];

router.use((req,res,next)=> {
  console.log("THE REQUEST IS IN USER ROUTER")
  next()
})

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    const validatorErrors = validationResult(req);
    let errors = [];

    if (validatorErrors.isEmpty()) {

      const user = await User.findOne({ where: { userName } });

      if (user !== null) {

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {

          loginUser(req, res, user);

          res.redirect("/questions/");
        }
      }
      errors.push("Login failed for the provided username and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("user-login", {
      title: "Login",
      userName,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get('/:id(\\d+)', requireAuth, asyncHandler (async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findByPk(userId, {include: [{model: Question, include: Answer}]})
  const questions = await Question.findAll({where: {userId: user.id}})
  const answers = await Answer.findAll({where: {userId: user.id}})
  res.render('user-profile', {user, questions, answers})
}))

router.get("/logout", (req, res) => {
  res.render("user-logout");
});

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/users/login");
});

module.exports = router;
