export const dummyStudent = {
  _id: 1,
  username: 'dummy_student',
  password: '',
  role: 'student',

  firstName: 'Monica',
  lastName: 'Hao',
  email: 'monicahao97@gmail.com',
  mobileNumber: '8577530850',
  portfolio: '',

  about: '',
  address: '',

  education: [''],
  skills: [''],
  projects: [''],
  experience: [''],

  registeredCourses: [{ courseid: '1', registeredDate: 'Nov 27 2022' }],
  waitlistedCourses: [
    { courseid: '2', waitlistedDate: 'Nov 25 2022' },
    { courseid: '4', waitlistedDate: 'Nov 27 2022' },
  ],

  requiredCredits: 32,
  acquiredCredits: 16,
  timeTicketFrom: '20221102',
  timeTicketTo: '20221107',
  advisor: '2',
  campus: 'Silicon Valley',
  college: 'Khoury College',
  department: 'Computer Science',

  comments: [],
};

export const dummyAdvisor = {
  _id: 2,
  username: 'dummy_advisor',
  password: '',
  role: 'advisor',

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

  officeHour: 'Sat 11am to 12pm',
  supervisedStudents: [],
  department: 'Computer Science',

  comments: [],
};

export const dummyAdmin = {
  _id: 3,
  username: 'dummy_admin',
  password: '',
  role: 'admin',

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

  comments: [],
};
