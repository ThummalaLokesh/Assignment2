const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// 1 - Render Login Form
router.get('/login', (req, res) =>
  res.render('login', { buttonText: 'Login', title: 'LOGIN' })
);
// 2 - Handle Login Form Submission
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);

// 3 - Render Register Form
router.get('/register', (req, res) =>
  res.render('register')
);
// 4 - Handle Register Form Submission
router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, account) {
      if (err) {
        console.log(err);
        return res.render('register', { account: account });
      }

      console.log(err, account)

      passport.authenticate('local')(req, res, function() {
        res.redirect('login');
      });
    }
  );
});
// 5 - Log out
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});

// 6- Edit profile

router.post('/edit', function(req, res, next){

  User.findById(req.user.id, function (err, user) {

      // todo: don't forget to handle err

    

      // good idea to trim 

      var username = req.body.username.trim();
      var password = req.body.password.trim();
      var email =  req.body.email.trim();
      

      // validate 
      

      // no need for else since you are returning early ^
     
      user.username = username;
      user.password = password;
      user.email = email;
      user.save(function (err) {

        // todo: don't forget to handle err

        res.redirect('/');
      });
  });
});

module.exports = router;
