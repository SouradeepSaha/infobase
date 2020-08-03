var express = require('express');
var router = express.Router();
const Missile = require('../models/Missle');

/* GET connect page */
router.get('/', function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render('logs', { title: "MissileLogs", User: req.user });
  }
  else {
    res.redirect("/register");
  }
});

router.get('/missiles', function (req, res) {
  Missile.find({}, function (err, missiles) {
    if (err) {
      console.log(err);
    }
    else {
      var missileMap = [];
      missiles.forEach(missile => {
        missileMap.push({
          location: missile.location,
          time: missile.time
        });
      });
      res.send(missileMap);
    }
  });
});

module.exports = router;
