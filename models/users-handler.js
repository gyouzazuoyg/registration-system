/**
 * Handle data from "users" "registered courses" "waitlisted courses" table
 */
const sql = require('./db-connection.js');

// Users contains functions used to get users related data from DB
const Users = function (user) {};

const userInfoFormatter = (sqlUserRawData) => {
  return {
    _id: sqlUserRawData['user_id'],
    username: sqlUserRawData['user_name'],
    password: sqlUserRawData['user_password'],
    role: sqlUserRawData['role_type'],

    firstName: sqlUserRawData['first_name'],
    lastName: sqlUserRawData['last_name'],
    email: sqlUserRawData['email'],
    mobileNumber: sqlUserRawData['mobile'],
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

    requiredCredits: sqlUserRawData['required_credits'],
    acquiredCredits: sqlUserRawData['acquired_credits'],
    timeTicketFrom: '20221102',
    timeTicketTo: '20221107',
    advisor: sqlUserRawData['advisor'],
    campus: sqlUserRawData['campus'],
    college: sqlUserRawData['college'],
    department: sqlUserRawData['department'],

    comments: [],
  };
};

// Get all users
Users.getAll = (resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = 'SELECT * FROM users;';
  sql.query(sqlQuery, (err, sqlResData) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, sqlResData);
  });
};

// Find the user by userName
Users.findUser = (userName, resCallback) => {
  let sqlQuery = `SELECT * FROM users WHERE user_name='${userName}';`;
  sql.query(sqlQuery, (err, sqlResData) => {
    // if no rows found, return null
    // if found, return the first element in the found array
    resCallback(err, sqlResData.length !== 0 ? userInfoFormatter(sqlResData[0]) : null);
  });
};

// Create new user
Users.createUser = (userName, password, roleType, resCallback) => {
  let sqlQuery = `INSERT INTO Users(user_name, user_password, role_type) VALUES ('${userName}', '${password}', '${roleType}');`;
  sql.query(sqlQuery, (err) => {
    // there is no return values from SQL, return null as data along with err
    resCallback(err, null);
  });
};

module.exports = Users;
