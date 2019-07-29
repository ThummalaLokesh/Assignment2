var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.redirect('/login');
};
router.post('*', requireAuth); 

router.get('/about', (req, res) =>
  res.render('about')
);

router.get('/create', (req, res) =>
  res.render('create')
);

router.get('/formcreated', (req, res) =>
  res.render('formcreated')
);

router.get('/preview', (req, res) =>
  res.render('preview')
);

router.get('/stats', (req, res) =>
  res.render('stats')
);



module.exports = router;
