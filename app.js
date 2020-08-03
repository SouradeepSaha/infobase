//Require Modules
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const MongoStore = require('connect-mongo')(session);
const io = require('socket.io')(5500);
const helmet = require('helmet');

const users = {};

io.on('connection', socket => {
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

//Require Routes
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var registerRouter = require('./routes/register');
var connectRouter = require('./routes/connect');
var logsRouter = require('./routes/logs');
var logRouter = require('./routes/log');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'
  })
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

//Using routes
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/register', registerRouter);
app.use('/connect', connectRouter);
app.use('/logs', logsRouter);
app.use('/log', logRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Database Connection
const uri =
  process.env.DB_HOST +
  process.env.DB_USER + ':' +
  process.env.DB_PASSWORD + '@' +
  process.env.DB_NAME + '.bu5a3.azure.mongodb.net/konnect?retryWrites=true&w=majority';

// GEOCODER_PROVIDER=mapquest;
// GEOCODER_API_KEY= VLWqUNc7vEFQDXdbcV6AsYtYXz4c5Qrc;  

//mongoose options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(uri, options, function (err) {
  console.log(err ? err : "DB connection successful");
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