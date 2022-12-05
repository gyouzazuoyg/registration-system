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
          message: err.message || 'Some error occurred while login.',
        });
      else {
        // Determine whether the password is correct
        if (data?.password === reqPassword) res.json(data);
        else {
          res.status(500).send({
            message: 'Login Failed!',
          });
        }
      }
    });
  } else {
    res.status(500).send({
      message: 'No username found in request body!',
    });
  }
});

// Register and create a new user
router.post('/register', function (req, res, next) {
  const userName = req.body['username'];
  const reqPassword = req.body['password'];
  const roleType = req.body['role'];
  // check whether must-have info is given in request body
  if (userName && reqPassword && roleType) {
    // check whether the user exists
    userQueries.findUser(userName, (err, data) => {
      if (data)
        res.status(500).send({
          message: 'User existent!',
        });
      else {
        // if username and password are given and no user conflicts, create user
        userQueries.createUser(userName, reqPassword, roleType, (err) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                'Some error occurred while registering new user.',
            });
          else res.send('New User Register Succeeded!');
        });
      }
    });
  } else {
    res.status(500).send({
      message: 'Info missing in request body!',
    });
  }
});

module.exports = router;
