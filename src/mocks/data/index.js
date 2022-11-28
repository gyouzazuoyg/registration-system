import { course1 } from './courses';

import { dummyStudent, dummyEmployer, dummyAdmin, dummyGuest } from './users';

const initMockDB = () => {
  return {
    users: {
      dummyStudent: dummyStudent,
      dummyEmployer: dummyEmployer,
      dummyAdmin: dummyAdmin,
      dummyGuest: dummyGuest,
    },
    courses: {
      course1: course1,
    },
  };
};

export { initMockDB };
