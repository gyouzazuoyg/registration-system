/**
 * Handle data from "courses" table
 */
const sql = require('./db-connection.js');

// Courses contains functions used to get courses related data from DB
const Courses = function (course) {};

// Get all courses
Courses.getAll = (resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = 'SELECT * FROM courses;';
  sql.query(sqlQuery, (err, sqlResData) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, sqlResData);
  });
};

module.exports = Courses;
