var express = require('express');
var router = express.Router();
const courseQueries = require('../models/courses-handler');

/* GET courses listing. */
router.get('/getallcourses', function (req, res, next) {
  courseQueries.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving courses.',
      });
    else res.send(data);
  });
});

module.exports = router;
