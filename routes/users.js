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

/* Find the info of a specific user by username specified in req.body */
router.post('/login', function (req, res, next) {
  const userName = req.body['username'];
  const reqPassword = req.body['password'];
  if (userName) {
    userQueries.findUser(userName, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.',
        });
      else {
        // Determine whether the password is correct
        if (data?.password === reqPassword) res.json(data);
        else res.json({});
      }
    });
  } else {
    res.status(500).send({
      message: 'No username found in request body!',
    });
  }
});

module.exports = router;
