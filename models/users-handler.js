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
    timeTicketFrom: sqlUserRawData['time_ticket_from'],
    timeTicketTo: sqlUserRawData['time_ticket_to'],
    major: sqlUserRawData['major'],
    officeHour: sqlUserRawData['office_hour'],
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
    registeredDate: sqlCourseRawData['date'],
  };
};

const waitlistedCourseFormatter = (sqlCourseRawData) => {
  return {
    courseid: sqlCourseRawData['CRN'],
    waitlistedDate: sqlCourseRawData['date'],
  };
};

const commentFormatter = (commentRawData) => {
  return {
    _id: commentRawData['comment_id'],
    userid: commentRawData['user_id'],
    crn: commentRawData['crn'],
    content: commentRawData['content'],
    dateTime: commentRawData['date_time'],
  };
};

// Get all users
Users.getAll = (resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = 'SELECT * FROM Users;';
  sql.query(sqlQuery, (err, sqlResData) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, sqlResData.map(userInfoFormatter));
  });
};

// Find the user by userName
Users.findUser = (userName, resCallback) => {
  let sqlQuery = `SELECT * FROM Users WHERE user_name='${userName}';`;
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
  let sqlQuery = `INSERT INTO StudentRegisteredCourses(student_id, CRN, date) VALUES (${studentId}, ${crn}, '${dateTime}')`;
  sql.query(sqlQuery, (err) => {
    resCallback(err, null);
  });
};

// Student waitlists course
Users.waitlistCourse = (studentId, crn, dateTime, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `INSERT INTO StudentWaitlistedCourses(student_id, CRN, date) VALUES (${studentId}, ${crn}, '${dateTime}')`;
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

Users.getUserComments = (studentId, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `SELECT * FROM UserComment WHERE user_id = ${studentId};`;
  sql.query(sqlQuery, (err, sqlResData) => {
    resCallback(err, sqlResData.map(commentFormatter));
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
Users.commentCourse = (studentId, crn, content, dateTime, resCallback) => {
  let sqlQuery = `INSERT INTO UserComment(user_id,crn, content, date_time) VALUES (${studentId}, ${crn},'${content}','${dateTime}');`;
  sql.query(sqlQuery, (err) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, null);
  });
};

// User updates profile
Users.updateProfile = (newProfile, userId, resCallback) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    about,
    requiredCredits,
    acquiredCredits,
    timeTicketFrom,
    timeTicketTo,
    advisor,
    campus,
    college,
    department,
    officeHour,
    major,
  } = newProfile;
  // let sqlQuery = `UPDATE Users SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', mobile = '${mobileNumber}',
  // about = '${about}', required_credits = ${requiredCredits}, accquired_credits = ${acquiredCredits}, time_ticket_from = '${timeTicketFrom}',
  // time_ticket_to = '${timeTicketTo}', advisor = ${advisor}, campus = '${campus}', college = '${college}', department = '${department}',
  // office_hour = '${officeHour}', major = '${major}' WHERE user_id = ${userId};`;
  const sqlQueryHead = 'UPDATE Users SET ';
  const sqlQueryTail = ` WHERE user_id = ${userId};`;
  let sqlQueryFields = '';
  if (firstName) sqlQueryFields += `first_name = '${firstName}',`;
  if (lastName) sqlQueryFields += `last_name = '${lastName}',`;
  if (email) sqlQueryFields += `email = '${email}',`;
  if (mobileNumber) sqlQueryFields += `mobile = '${mobileNumber}',`;
  if (about) sqlQueryFields += `about = '${about}',`;
  if (requiredCredits)
    sqlQueryFields += `required_credits = ${requiredCredits},`;
  if (acquiredCredits)
    sqlQueryFields += `accquired_credits = ${acquiredCredits},`;
  if (timeTicketFrom)
    sqlQueryFields += `time_ticket_from = '${timeTicketFrom}',`;
  if (timeTicketTo) sqlQueryFields += `time_ticket_to = '${timeTicketTo}',`;
  if (advisor) sqlQueryFields += `advisor = ${advisor},`;
  if (campus) sqlQueryFields += `campus = '${campus}',`;
  if (college) sqlQueryFields += `college = '${college}',`;
  if (department) sqlQueryFields += `department = '${department}',`;
  if (officeHour) sqlQueryFields += `office_hour = '${officeHour}',`;
  if (major) sqlQueryFields += `major = '${major}',`;
  sqlQueryFields = sqlQueryFields.substring(0, sqlQueryFields.lastIndexOf(','));

  const sqlQuery = sqlQueryHead + sqlQueryFields + sqlQueryTail;
  sql.query(sqlQuery, (err) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, null);
  });
};

Users.deleteComment = (commentId, resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = `DELETE FROM UserComment WHERE comment_id = ${commentId};`;
  sql.query(sqlQuery, (err) => {
    resCallback(err, null);
  });
};

module.exports = Users;
