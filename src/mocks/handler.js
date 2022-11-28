import { rest } from 'msw';
import { initMockDB } from './data';

const DB = initMockDB();

export const handlers = [
  rest.post('/api/users/login', (req, res, ctx) => {
    let retval = {};
    let status = 200;
    switch (req.body.username) {
      case 'student':
        retval = DB.users.dummyStudent;
        break;
      case 'admin':
        retval = DB.users.dummyAdmin;
        break;
      case 'advisor':
        retval = DB.users.dummyAdvisor;
        break;
      case 'guest':
        retval = DB.users.dummyGuest;
        break;
      default:
        retval = DB.users.dummyStudent;
    }

    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.json(retval),
    );
  }),

  rest.get('/api/courses/getallcourses', (req, res, ctx) => {
    let retval = [];
    for (const key in DB.courses) {
      retval.push(DB.courses[key]);
    }
    let status = 200;

    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.json(retval),
    );
  }),

  rest.get('/api/users/getallusers', (req, res, ctx) => {
    let retval = [];
    for (const key in DB.users) {
      retval.push(DB.users[key]);
    }
    let status = 200;

    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.json(retval),
    );
  }),

  rest.post('/api/courses/registercourse', (req, res, ctx) => {
    const { user, course } = req.body;
    const userId = user._id;
    const courseId = course._id;
    let courseDetails = {};
    for (const key in DB.courses) {
      if (DB.courses[key]._id === courseId) {
        courseDetails = DB.courses[key];
      }
    }
    let userDetails = {};
    for (const key in DB.users) {
      if (DB.users[key]._id === userId) {
        userDetails = DB.users[key];
      }
    }

    const registeredCandidate = {
      userid: user._id,
      registeredDate: moment().format('MMM DD yyyy'),
    };
    courseDetails.registeredCandidates.push(registeredCandidate);

    const registeredCourse = {
      courseid: course._id,
      registeredDate: moment().format('MMM DD yyyy'),
    };
    userDetails.registeredCourses.push(registeredCourse);

    let status = 200;
    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.text('Course Registered Successfully'),
    );
  }),
];
