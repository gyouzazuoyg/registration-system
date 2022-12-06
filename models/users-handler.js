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

    registeredCourses: [],
    waitlistedCourses: [],

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

const registeredCourseFormatter = (sqlCourseRawData) => {
  return {
    courseid: sqlCourseRawData['CRN'],
    registeredDate: sqlCourseRawData['datetime'],
  };
};

const waitlistedCourseFormatter = (sqlCourseRawData) => {
  return {
    courseid: sqlCourseRawData['CRN'],
    waitlistedDate: sqlCourseRawData['datetime'],
  };
};

const commentFormatter = (commentRawData) => {
  return {
    _id: commentRawData['comment_id'],
    userid: commentRawData['user_id'],
    content: commentRawData['content'],
    dateTime: commentRawData['date'],
  };
};

// Get all users
Users.getAll = (resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = 'SELECT * FROM users;';
  sql.query(sqlQuery, (err, sqlResData) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, sqlResData.map(userInfoFormatter));
  });
};

// Find the user by userName
Users.findUser = (userName, resCallback) => {
  let sqlQuery = `SELECT * FROM users WHERE user_name='${userName}';`;
  sql.query(sqlQuery, (err, sqlResData) => {
    // if no rows found, return null
    // if found, return the first element in the found array
    resCallback(
      err,
      sqlResData.length !== 0 ? userInfoFormatter(sqlResData[0]) : null,
    );
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

// Student registers course
Users.registerCourse = (studentId, crn, dateTime, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `INSERT INTO StudentRegisteredCourses(student_id, CRN, datetime) VALUES (${studentId}, ${crn}, '${dateTime}')`;
  sql.query(sqlQuery, (err) => {
    resCallback(err, null);
  });
};

// Student waitlists course
Users.waitlistCourse = (studentId, crn, dateTime, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `INSERT INTO StudentWaitlistedCourses(student_id, CRN, datetime) VALUES (${studentId}, ${crn}, '${dateTime}')`;
  sql.query(sqlQuery, (err) => {
    resCallback(err, null);
  });
};

// Get registered list by username
Users.getRegisteredCourses = (studentId, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `SELECT * FROM StudentRegisteredCourses WHERE student_id = ${studentId};`;
  sql.query(sqlQuery, (err, sqlResData) => {
    resCallback(err, sqlResData.map(registeredCourseFormatter));
  });
};

// Get waitlisted list by username
Users.getWaitlistedCourses = (studentId, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `SELECT * FROM StudentWaitlistedCourses WHERE student_id = ${studentId};`;
  sql.query(sqlQuery, (err, sqlResData) => {
    resCallback(err, sqlResData.map(waitlistedCourseFormatter));
  });
};

// Student drops course
Users.dropCourse = (studentId, crn, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `DELETE FROM StudentRegisteredCourses WHERE student_id = ${studentId} AND crn = ${crn};`;
  sql.query(sqlQuery, (err) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, null);
  });
};

// Student drops waitlist
Users.dropWaitlist = (studentId, crn, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `DELETE FROM StudentWaitlistedCourses WHERE student_id = ${studentId} AND crn = ${crn};`;
  sql.query(sqlQuery, (err) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, null);
  });
};

//User comment course
Users.commentCourse = (newComment, resCallback) => {
  let sqlQuery = `INSERT INTO UserComment(user_id, content, date_time) VALUES (${newComment.studentId}, '${newComment.content}', '${newComment.dateTime}');`;
  sql.query(sqlQuery, (err) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, null);
  });
};

// User updates profile

module.exports = Users;
