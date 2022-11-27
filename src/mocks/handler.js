import { rest } from 'msw';
import { initMockDB } from './data';

const DB = initMockDB();

export const handlers = [
  rest.post('/api/users/login', (req, res, ctx) => {
    let retval = DB.users.dummyStudent;
    let status = 200;

    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.json(retval),
    );
  }),

  rest.get('/api/jobs/getalljobs', (req, res, ctx) => {
    let retval = [];
    for (const key in DB.jobs) {
      retval.push(DB.jobs[key]);
    }
    let status = 200;

    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.json(retval),
    );
  }),
];
