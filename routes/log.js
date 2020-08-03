var express = require('express');
var router = express.Router();
const Missile = require('../models/Missle');

/* GET connect page */
router.get('/', function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render('log', { title: "LogMissile", User: req.user });
  }
  else {
    res.redirect("/register");
  }
});

router.post('/', function (req, res) {
  const { location, time } = req.body;

    if (location === 'undifined') {

      alert("Must select a location!")

    } else {

        const missile = new Missile({
          location: location,
          time: time
        });

        missile.save(err => {
          console.log(err); 
        }); 
        res.redirect('/logs');
    
    }

  });


module.exports = router;