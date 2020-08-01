var express = require('express');
var router = express.Router();

/* GET the user account page */
router.get('/', function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render('account', { title: "My account", User: req.user });
  }
  else {
    res.redirect("/register");
  }
});

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
