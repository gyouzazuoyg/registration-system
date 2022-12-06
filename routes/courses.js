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

//Create a new course
router.post('/postcourse', function (req, res, next) {
  courseQueries.postCourse(req.body, (err) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while posting new course.',
      });
    else res.send('Post Course Succeeded!');
  });
});

// Course get registered students
router.post('/getregisteredstudents', function (req, res, next) {
  const crn = req.body.crn;
  courseQueries.getRegisteredStudents(crn, (err, data) => {
    if (err)
      res.status(500).send({
        message: 'Some error occurred while getting registered students.',
      });
    else res.json(data);
  });
});

// Course get waitlisted students
router.post('/getwaitlistedstudents', function (req, res, next) {
  const crn = req.body.crn;
  courseQueries.getWaitlistedStudents(crn, (err, data) => {
    if (err)
      res.status(500).send({
        message: 'Some error occurred while getting registered students.',
      });
    else res.json(data);
  });
});

/* Delete courses listing. */
router.delete('/deletecourse', function (req, res, next) {
  courseQueries.deleteCourse((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting course.',
      });
    else res.send(data);
  });
});

module.exports = router;
