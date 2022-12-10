var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance_management'
});

connection.connect((err) => {
  if (err) {
      console.log('Error connecting to Db');
      return;
  }
  console.log('Connection established');
});
module.exports= connection;