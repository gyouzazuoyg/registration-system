var express = require('express');
var router = express.Router();

/* GET api home page. */
router.get('/', function (req, res, next) {
  res.render('api', { title: 'Express API' });
});

module.exports = router;
