const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'zylowj25x51u.us-east-1.psdb.cloud',
  user: '',
  password: "",
  database: 'todolist',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = connection
