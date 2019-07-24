var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(
  `mongodb+srv://assignment2:assignment2@cluster0-1r0am.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to Mongodb'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'kjnhfwkejsdhfjchw3hruy23iyriuwyefkcnskdbchhbf3uhfbubjnjn',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize()); // Initiaize Passport first
app.use(passport.session()); // Use passport with session

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
//passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
