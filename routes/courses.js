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

//Update course
router.post('/editcourse', function (req, res, next) {
  const newCourse = {
    courseId: req.body.courseId,
    courseName: req.body.courseName,
    term: req.body.term,
    schedule: req.body.schedule,
    credits: req.body.credits,
    professor: req.body.professor,
    prerequisites: req.body.prerequisites,
    capacity: req.body.capacity,
    waitlistCapacity: req.body.waitlistCapacity,
    courseDescription: req.body.courseDescription,
    department: req.body.department,
    college: req.body.college,
    classroom: req.body.classroom,
    building: req.body.building,
    campus: req.body.campus,
  };
  const crn = req.body.crn;
  courseQueries.updateCourse(newCourse, crn, (err) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while updating course.',
      });
    else res.send('Update Course Succeeded!');
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

router.post('/getcoursecomments', function (req, res, next) {
  const crn = req.body.crn;
  courseQueries.getCourseComments(crn, (err, data) => {
    if (err)
      res.status(500).send({
        message: 'Some error occurred while getting course comments.',
      });
    else res.json(data);
  });
});

/* Delete courses listing. */
router.post('/deletecourse', function (req, res, next) {
  const crn = req.body.crn;
  courseQueries.deleteCourse(crn, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting course.',
      });
    else res.send(data);
  });
});

module.exports = router;
