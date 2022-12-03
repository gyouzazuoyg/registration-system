import { course1, course2, course3, course4 } from './courses';

import { dummyStudent, dummyAdvisor, dummyAdmin } from './users';

const initMockDB = () => {
  return {
    users: {
      dummyStudent: dummyStudent,
      dummyAdvisor: dummyAdvisor,
      dummyAdmin: dummyAdmin,
    },
    courses: {
      course1: course1,
      course2: course2,
      course3: course3,
      course4: course4,
    },
  };
};

export { initMockDB };
