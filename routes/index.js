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

router.get('/create', requireAuth, (req, res) =>
  res.render('create')
);

router.get('/formcreated', requireAuth, (req, res) =>
  res.render('formcreated')
);

router.get('/preview', requireAuth, (req, res) =>
  res.render('preview')
);

router.get('/stats', requireAuth, (req, res) =>
  res.render('stats')
);

router.get('/edit', requireAuth, (req, res) =>
  res.render('edit')
);



module.exports = router;
