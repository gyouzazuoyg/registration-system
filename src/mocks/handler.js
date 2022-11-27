import { rest } from 'msw';

export const handlers = [
  // Handles a POST /login request
  rest.post('/api/users/login', (req, res, ctx) => {
    let retval = {
      username: 'dummy_username',
      password: '',
      role: 'student',

      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      portfolio: '',

      about: '',
      address: '',

      education: [''],
      skills: [''],
      projects: [''],
      experience: [''],
    };
    let status = 200;

    return res(
      // Respond with a 200 status code
      ctx.status(status),
      ctx.json(retval),
    );
  }),
];
