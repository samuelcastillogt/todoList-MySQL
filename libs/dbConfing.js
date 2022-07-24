const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'zylowj25x51u.us-east-1.psdb.cloud',
  user: '3aqq0h3y7xdi',
  password: "pscale_pw_NDbobN7usV3O0X96OBiH7dqhceL51GuA_zzSTF8tIgM",
  database: 'todolist',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = connection