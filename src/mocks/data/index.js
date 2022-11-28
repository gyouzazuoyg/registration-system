import { job1 } from './jobs';

import { dummyStudent, dummyEmployer, dummyAdmin, dummyGuest } from './users';

const initMockDB = () => {
  return {
    users: {
      dummyStudent: dummyStudent,
      dummyEmployer: dummyEmployer,
      dummyAdmin: dummyAdmin,
      dummyGuest: dummyGuest,
    },
    jobs: {
      job1: job1,
    },
  };
};

export { initMockDB };
