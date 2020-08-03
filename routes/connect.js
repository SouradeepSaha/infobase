var express = require('express');
var router = express.Router();


/* GET connect page */
router.get('/', function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render('connect', { title: "Connect", User: req.user });
  }
  else {
    res.redirect("/register");
  }
});

module.exports = router;
