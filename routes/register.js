const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const { userValidationRules, validate } = require('../validator.js');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/account");
  }
  else {
    res.render('register', { title: "Log In or Register", errors: [] });
  }
});

router.post('/login', function (req, res) {
  const { email, password } = req.body;
  console.log(req.body);

  const user = new User({
    username: email,
    email: email,
    password: password
  });
  // req.login(user, function (err) {
  //   if (err) {
  //     return res.render('register', {title: "Login Error", loginErr: true});
  //   }
  //   else {
  //     passport.authenticate("local")(req, res, function () {
  //       res.redirect("/account");
  //     });
  //   }
  // });
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.render('register', {title: "Login Error", loginErr: true});
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.redirect("/account");        
    });
  })(req, res);
});

router.post('/register', userValidationRules(), validate, function (req, res) {
  const { name, email, password } = req.body;
  console.log(req.body);
  
  const user = new User({
    username: email,
    name: name,
    email: email,
    password: password
  });

  User.register(user, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render('register', { title: "Registration failure", errors: [{msg: "Passport Error: registration failed"}] });
    }
    else {
      passport.authenticate("local")(req, res, function () {
        res.render('register', {title: "Success", success: true});
      });
    }
  });
});

module.exports = router;