
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const {sessionSecret} = require("./config/index");
const { restoreUser } = require("./auth");
const app = express();
const questionsRouter = require("./routes/questions");
const answerRouter = require("./routes/answers");
const votesRouter = require("./routes/votes")
const { asyncHandler, handleValidationErrors } = require("./utils.js");


// view engine setup
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.urlencoded({ extended: false }));
// create Session table if it doesn't already exist
store.sync();
app.use(restoreUser);
app.use("/votes", votesRouter);
app.use("/users", usersRouter);
app.use("/questions", questionsRouter);
app.use('/answers', answerRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use( (req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.render('404', {err})
  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
})

// app.use( asyncHandler(async(req, res, next)=> {
//   next(createError(404));
// }));

// app.use(asyncHandler(async (err, req, res, next) =>{
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.render('404')
// }))


module.exports = app;
