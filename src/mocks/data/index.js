import { course1 } from './courses';

import { dummyStudent, dummyAdvisor, dummyAdmin, dummyGuest } from './users';

const initMockDB = () => {
  return {
    users: {
      dummyStudent: dummyStudent,
      dummyAdvisor: dummyAdvisor,
      dummyAdmin: dummyAdmin,
      dummyGuest: dummyGuest,
    },
    courses: {
      course1: course1,
    },
  };
};

export { initMockDB };
