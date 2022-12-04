/**
 * Handle data from "users" table
 */
const sql = require('./db-connection.js');

// Users contains functions used to get users related data from DB
const Users = function (user) {};

// Get all users
Users.getAll = (resCallback) => {
  // resCallback is a function pointer passed from routes
  let sqlQuery = 'SELECT * FROM users;';
  sql.query(sqlQuery, (err, sqlResData) => {
    // Returning sqlResData, which is the achieved array of data rows, to the corresponding route
    resCallback(err, sqlResData);
  });
};

module.exports = Users;
