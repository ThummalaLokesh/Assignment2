/* 
    File name = index.js
    Author name = Lokesh Thummala, Huashan, Kengo, Nestor
    web site name = https://surveys-site.herokuapp.com/
    file description = This is index file to the website. It contains all routings. */
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
/* GET about page. */
router.get('/about', (req, res) =>
  res.render('about')
);
/* requires authentication for all below */
router.use(requireAuth);
/* GET create page. */
router.get('/create', requireAuth, (req, res) =>
  res.render('create')
);
/* GET fromcreated page. */
router.get('/formcreated', requireAuth, (req, res) =>
  res.render('formcreated')
);
/* GET preview page. */
router.get('/preview', requireAuth, (req, res) =>
  res.render('preview')
);
/* GET stats page. */
router.get('/stats', requireAuth, (req, res) =>
  res.render('stats')
);
/* GET edit page. */
router.get('/edit', requireAuth, (req, res) =>
  res.render('edit')
);

module.exports = router;
