var express = require('express');
var router = express.Router();
const userQueries = require('../models/users-handler');

/* GET users listing. */
router.get('/getallusers', function (req, res, next) {
  userQueries.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    else res.send(data);
  });
});

router.get('/getallusers', function (req, res, next) {
  userQueries.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    else res.send(data);
  });
});

module.exports = router;
