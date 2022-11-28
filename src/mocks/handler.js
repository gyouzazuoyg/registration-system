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
];
